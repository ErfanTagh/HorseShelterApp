import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useRoute, useNavigation } from '@react-navigation/native';

// Mock data for horse details
const horseData: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Thunder',
    breed: 'Thoroughbred',
    age: 8,
    gender: 'Gelding',
    status: 'healthy',
    location: 'Barn A - Stall 3',
    arrivalDate: '2023-03-15',
    imageUrl: 'https://images.unsplash.com/photo-1587778907607-d36fc21ac297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGhvcnNlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0NjI3NzQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'Bay',
    weight: '1,200 lbs',
    height: '16 hands',
    microchipId: 'TC8472956',
    temperament: 'Calm and friendly',
    specialNeeds: 'None',
    medicalHistory: [
      { date: '2024-11-15', type: 'Checkup', description: 'Annual veterinary examination - all clear', vet: 'Dr. Sarah Johnson' },
      { date: '2024-09-20', type: 'Vaccination', description: 'Flu and tetanus booster', vet: 'Dr. Sarah Johnson' },
      { date: '2024-06-10', type: 'Dental', description: 'Routine dental floating', vet: 'Dr. Michael Chen' },
      { date: '2024-03-15', type: 'Treatment', description: 'Minor hoof abscess treated successfully', vet: 'Dr. Sarah Johnson' },
    ],
    feedingSchedule: [
      { time: '6:00 AM', food: 'Hay (5 lbs) + Grain (2 lbs)', supplements: 'Joint support' },
      { time: '12:00 PM', food: 'Hay (3 lbs)', supplements: 'None' },
      { time: '6:00 PM', food: 'Hay (5 lbs) + Grain (2 lbs)', supplements: 'Vitamins' },
    ],
    notes: [
      { date: '2024-11-28', author: 'Jane Smith', note: 'Responding well to new exercise routine' },
      { date: '2024-11-20', author: 'Mike Roberts', note: 'Farrier visit scheduled for next week' },
      { date: '2024-11-10', author: 'Jane Smith', note: 'Thunder has been very social with other horses lately' },
    ],
  },
  '2': {
    id: '2',
    name: 'Bella',
    breed: 'Quarter Horse',
    age: 5,
    gender: 'Mare',
    status: 'healthy',
    location: 'Barn A - Stall 7',
    arrivalDate: '2024-01-20',
    imageUrl: 'https://images.unsplash.com/photo-1707989868817-19700c5dcd1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGhvcnNlJTIwaGVhZHxlbnwxfHx8fDE3NjQ2Mjc3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'Palomino',
    weight: '1,100 lbs',
    height: '15 hands',
    microchipId: 'QH9384752',
    temperament: 'Energetic and playful',
    specialNeeds: 'None',
    medicalHistory: [
      { date: '2024-10-05', type: 'Checkup', description: 'Health examination - excellent condition', vet: 'Dr. Sarah Johnson' },
      { date: '2024-07-12', type: 'Vaccination', description: 'West Nile and rabies vaccination', vet: 'Dr. Michael Chen' },
    ],
    feedingSchedule: [
      { time: '6:00 AM', food: 'Hay (4 lbs) + Grain (1.5 lbs)', supplements: 'None' },
      { time: '12:00 PM', food: 'Hay (3 lbs)', supplements: 'None' },
      { time: '6:00 PM', food: 'Hay (4 lbs) + Grain (1.5 lbs)', supplements: 'Coat supplement' },
    ],
    notes: [
      { date: '2024-11-25', author: 'Jane Smith', note: 'Very active during turnout today' },
      { date: '2024-11-18', author: 'Sarah Williams', note: 'Adoption application received - pending review' },
    ],
  },
};

export function HorseProfile() {
  const route = useRoute();
  const navigation = useNavigation();
  const { horseId } = route.params as { horseId: string };
  const [activeTab, setActiveTab] = useState('medical');

  if (!horseId || !horseData[horseId]) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Horse not found</Text>
      </View>
    );
  }

  const horse = horseData[horseId];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-700';
      case 'treatment':
        return 'bg-red-100 text-red-700';
      case 'observation':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const daysSinceArrival = Math.floor(
    (new Date().getTime() - new Date(horse.arrivalDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Card style={styles.profileImageCard}>
          <View style={styles.imageContainer}>
            <ImageWithFallback
              src={horse.imageUrl}
              alt={horse.name}
              style={styles.horseImage}
            />
          </View>
          <CardContent style={styles.profileInfo}>
            <View style={styles.profileHeaderRow}>
              <View style={styles.profileTitle}>
                <Text style={styles.horseName}>{horse.name}</Text>
                <Text style={styles.horseBreed}>{horse.breed}</Text>
              </View>
              <Badge className={getStatusColor(horse.status)}>
                {horse.status}
              </Badge>
            </View>
            <View style={styles.profileDetails}>
              <View style={styles.profileDetailRow}>
                <Text style={styles.profileDetailLabel}>Age</Text>
                <Text style={styles.profileDetailValue}>{horse.age} years</Text>
              </View>
              <View style={styles.profileDetailRow}>
                <Text style={styles.profileDetailLabel}>Gender</Text>
                <Text style={styles.profileDetailValue}>{horse.gender}</Text>
              </View>
              <View style={styles.profileDetailRow}>
                <Text style={styles.profileDetailLabel}>Color</Text>
                <Text style={styles.profileDetailValue}>{horse.color}</Text>
              </View>
              <View style={styles.profileDetailRow}>
                <Text style={styles.profileDetailLabel}>Weight</Text>
                <Text style={styles.profileDetailValue}>{horse.weight}</Text>
              </View>
              <View style={styles.profileDetailRow}>
                <Text style={styles.profileDetailLabel}>Height</Text>
                <Text style={styles.profileDetailValue}>{horse.height}</Text>
              </View>
              <View style={styles.profileDetailRow}>
                <Text style={styles.profileDetailLabel}>Microchip ID</Text>
                <Text style={[styles.profileDetailValue, styles.microchipId]}>{horse.microchipId}</Text>
              </View>
            </View>
          </CardContent>
        </Card>

        <Card style={styles.detailsCard}>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent style={styles.detailsContent}>
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <View style={styles.detailItemHeader}>
                  <MaterialIcons name="location-on" size={16} color="#6b7280" />
                  <Text style={styles.detailItemLabel}>Location</Text>
                </View>
                <Text style={styles.detailItemValue}>{horse.location}</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={styles.detailItemHeader}>
                  <MaterialIcons name="event" size={16} color="#6b7280" />
                  <Text style={styles.detailItemLabel}>Arrival Date</Text>
                </View>
                <Text style={styles.detailItemValue}>
                  {new Date(horse.arrivalDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailItemHeader}>
                <MaterialIcons name="favorite" size={16} color="#6b7280" />
                <Text style={styles.detailItemLabel}>Temperament</Text>
              </View>
              <Text style={styles.detailItemValue}>{horse.temperament}</Text>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailItemHeader}>
                <MaterialIcons name="warning" size={16} color="#6b7280" />
                <Text style={styles.detailItemLabel}>Special Needs</Text>
              </View>
              <Text style={styles.detailItemValue}>{horse.specialNeeds}</Text>
            </View>

            <View style={styles.daysContainer}>
              <Text style={styles.daysText}>
                {horse.name} has been with us for {daysSinceArrival} days
              </Text>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* Tabbed Content */}
      <Tabs defaultValue="medical" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
            <TabsTrigger value="medical">
              Medical History
            </TabsTrigger>
            <TabsTrigger value="feeding">
              Feeding Schedule
            </TabsTrigger>
            <TabsTrigger value="notes">
              Notes
            </TabsTrigger>
        </TabsList>

        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
            </CardHeader>
            <CardContent>
              <View style={styles.recordsList}>
                {horse.medicalHistory.map((record: any, index: number) => (
                  <View key={index} style={styles.recordItem}>
                    <Text style={styles.recordDate}>
                      {new Date(record.date).toLocaleDateString()}
                    </Text>
                    <View style={styles.recordContent}>
                      <View style={styles.recordHeader}>
                        <MaterialIcons name="fitness-center" size={16} color="#059669" />
                        <Text style={styles.recordType}>{record.type}</Text>
                      </View>
                      <Text style={styles.recordDescription}>{record.description}</Text>
                      <Text style={styles.recordVet}>Veterinarian: {record.vet}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feeding">
          <Card>
            <CardHeader>
              <CardTitle>Daily Feeding Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <View style={styles.recordsList}>
                {horse.feedingSchedule.map((schedule: any, index: number) => (
                  <View key={index} style={styles.recordItem}>
                    <Text style={styles.feedingTime}>{schedule.time}</Text>
                    <View style={styles.recordContent}>
                      <Text style={styles.recordDescription}>{schedule.food}</Text>
                      {schedule.supplements !== 'None' && (
                        <Text style={styles.recordVet}>Supplements: {schedule.supplements}</Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Care Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <View style={styles.recordsList}>
                {horse.notes.map((note: any, index: number) => (
                  <View key={index} style={styles.noteItem}>
                    <View style={styles.noteHeader}>
                      <MaterialIcons name="description" size={16} color="#9ca3af" />
                      <Text style={styles.noteDate}>
                        {new Date(note.date).toLocaleDateString()}
                      </Text>
                      <Text style={styles.noteSeparator}>•</Text>
                      <Text style={styles.noteAuthor}>{note.author}</Text>
                    </View>
                    <Text style={styles.noteText}>{note.note}</Text>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
  },
  errorText: {
    fontSize: 16,
    color: '#6b7280',
  },
  profileHeader: {
    marginBottom: 24,
  },
  profileImageCard: {
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  horseImage: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    padding: 24,
  },
  profileHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  profileTitle: {
    flex: 1,
  },
  horseName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  horseBreed: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  profileDetails: {
    gap: 12,
  },
  profileDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileDetailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  profileDetailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  microchipId: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
  detailsCard: {
    marginBottom: 16,
  },
  detailsContent: {
    gap: 24,
  },
  detailsGrid: {
    gap: 24,
  },
  detailItem: {
    gap: 8,
  },
  detailItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  detailItemLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  detailItemValue: {
    fontSize: 16,
    color: '#111827',
  },
  daysContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  daysText: {
    fontSize: 14,
    color: '#6b7280',
  },
  recordsList: {
    gap: 16,
  },
  recordItem: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  recordDate: {
    width: 96,
    fontSize: 14,
    color: '#6b7280',
  },
  recordContent: {
    flex: 1,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  recordType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  recordDescription: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  recordVet: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  feedingTime: {
    width: 96,
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  noteItem: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  noteSeparator: {
    fontSize: 14,
    color: '#9ca3af',
  },
  noteAuthor: {
    fontSize: 14,
    color: '#6b7280',
  },
  noteText: {
    fontSize: 16,
    color: '#111827',
  },
});
