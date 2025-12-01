import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface Horse {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: 'Mare' | 'Stallion' | 'Gelding';
  status: 'healthy' | 'treatment' | 'observation';
  location: string;
  arrivalDate: string;
  imageUrl: string;
  color: string;
}

const horses: Horse[] = [
  {
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
  },
  {
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
  },
  {
    id: '3',
    name: 'Storm',
    breed: 'Arabian',
    age: 6,
    gender: 'Stallion',
    status: 'observation',
    location: 'Barn B - Stall 2',
    arrivalDate: '2024-09-10',
    imageUrl: 'https://images.unsplash.com/photo-1670212433014-b2435aca06a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGhvcnNlfGVufDF8fHx8MTc2NDYyNzc0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'Black',
  },
  {
    id: '4',
    name: 'Luna',
    breed: 'Appaloosa',
    age: 4,
    gender: 'Mare',
    status: 'healthy',
    location: 'Barn C - Stall 5',
    arrivalDate: '2024-06-22',
    imageUrl: 'https://images.unsplash.com/photo-1645688917394-cfc228b20324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmV5JTIwaG9yc2V8ZW58MXx8fHwxNzY0NjI3NzQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'Grey',
  },
  {
    id: '5',
    name: 'Max',
    breed: 'Morgan',
    age: 12,
    gender: 'Gelding',
    status: 'treatment',
    location: 'Medical Barn - Stall 1',
    arrivalDate: '2022-11-08',
    imageUrl: 'https://images.unsplash.com/photo-1587778907607-d36fc21ac297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGhvcnNlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0NjI3NzQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'Chestnut',
  },
  {
    id: '6',
    name: 'Spirit',
    breed: 'Mustang',
    age: 7,
    gender: 'Gelding',
    status: 'healthy',
    location: 'Barn B - Stall 8',
    arrivalDate: '2023-08-14',
    imageUrl: 'https://images.unsplash.com/photo-1670212433014-b2435aca06a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGhvcnNlfGVufDF8fHx8MTc2NDYyNzc0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'Buckskin',
  },
  {
    id: '7',
    name: 'Daisy',
    breed: 'Paint Horse',
    age: 3,
    gender: 'Mare',
    status: 'healthy',
    location: 'Barn A - Stall 12',
    arrivalDate: '2024-10-05',
    imageUrl: 'https://images.unsplash.com/photo-1707989868817-19700c5dcd1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGhvcnNlJTIwaGVhZHxlbnwxfHx8fDE3NjQ2Mjc3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'Pinto',
  },
  {
    id: '8',
    name: 'Rocky',
    breed: 'Tennessee Walker',
    age: 10,
    gender: 'Gelding',
    status: 'observation',
    location: 'Barn C - Stall 3',
    arrivalDate: '2023-05-18',
    imageUrl: 'https://images.unsplash.com/photo-1587778907607-d36fc21ac297?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGhvcnNlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0NjI3NzQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'Brown',
  },
];

export function HorseRoster() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredHorses = horses.filter((horse) => {
    const matchesSearch = horse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         horse.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || horse.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const handleSelectHorse = (horseId: string) => {
    navigation.navigate('HorseProfile' as never, { horseId } as never);
  };

  const renderHorse = ({ item }: { item: Horse }) => (
    <TouchableOpacity
      onPress={() => handleSelectHorse(item.id)}
      style={styles.horseCard}
    >
      <Card style={styles.card}>
        <View style={styles.horseImageContainer}>
          <ImageWithFallback
            src={item.imageUrl}
            alt={item.name}
            style={styles.horseImage}
          />
        </View>
        <CardContent style={styles.horseContent}>
          <View style={styles.horseHeader}>
            <View style={styles.horseInfo}>
              <Text style={styles.horseName}>{item.name}</Text>
              <Text style={styles.horseBreed}>{item.breed}</Text>
            </View>
            <Badge className={getStatusColor(item.status)}>
              {item.status}
            </Badge>
          </View>
          <View style={styles.horseDetails}>
            <Text style={styles.horseDetailText}>
              {item.age} years • {item.gender}
            </Text>
            <View style={styles.horseDetailRow}>
              <MaterialIcons name="location-on" size={16} color="#9ca3af" />
              <Text style={styles.horseDetailText}>{item.location}</Text>
            </View>
            <View style={styles.horseDetailRow}>
              <MaterialIcons name="event" size={16} color="#9ca3af" />
              <Text style={styles.horseDetailText}>
                Arrived {new Date(item.arrivalDate).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Horse Roster</Text>
        <Text style={styles.subtitle}>Manage and view all horses in the shelter</Text>
      </View>

      {/* Search and Filter Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MaterialIcons name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or breed..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          <TouchableOpacity
            onPress={() => setStatusFilter('all')}
            style={[styles.filterButton, statusFilter === 'all' && styles.filterButtonActive]}
          >
            <Text style={[styles.filterButtonText, statusFilter === 'all' && styles.filterButtonTextActive]}>
              All ({horses.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStatusFilter('healthy')}
            style={[styles.filterButton, statusFilter === 'healthy' && styles.filterButtonActiveGreen]}
          >
            <Text style={[styles.filterButtonText, statusFilter === 'healthy' && styles.filterButtonTextActive]}>
              Healthy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStatusFilter('observation')}
            style={[styles.filterButton, statusFilter === 'observation' && styles.filterButtonActiveAmber]}
          >
            <Text style={[styles.filterButtonText, statusFilter === 'observation' && styles.filterButtonTextActive]}>
              Observation
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setStatusFilter('treatment')}
            style={[styles.filterButton, statusFilter === 'treatment' && styles.filterButtonActiveRed]}
          >
            <Text style={[styles.filterButtonText, statusFilter === 'treatment' && styles.filterButtonTextActive]}>
              Treatment
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Horse Grid */}
      {filteredHorses.length > 0 ? (
        <FlatList
          data={filteredHorses}
          renderItem={renderHorse}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={styles.horseRow}
          contentContainerStyle={styles.horseGrid}
        />
      ) : (
        <View style={styles.emptyState}>
          <MaterialIcons name="filter-list" size={48} color="#9ca3af" />
          <Text style={styles.emptyStateText}>No horses found matching your criteria</Text>
          <TouchableOpacity
            onPress={() => {
              setSearchQuery('');
              setStatusFilter('all');
            }}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>Clear filters</Text>
          </TouchableOpacity>
        </View>
      )}
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
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  searchContainer: {
    marginBottom: 24,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#111827',
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  filterButtonActiveGreen: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  filterButtonActiveAmber: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },
  filterButtonActiveRed: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  horseGrid: {
    marginHorizontal: -8,
  },
  horseRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  horseCard: {
    width: (width - 48) / 2,
    marginHorizontal: 8,
  },
  card: {
    marginBottom: 0,
  },
  horseImageContainer: {
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
  horseContent: {
    padding: 16,
  },
  horseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  horseInfo: {
    flex: 1,
  },
  horseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  horseBreed: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  horseDetails: {
    gap: 8,
  },
  horseDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  horseDetailText: {
    fontSize: 14,
    color: '#6b7280',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 16,
    textAlign: 'center',
  },
  clearButton: {
    marginTop: 16,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#059669',
    fontWeight: '600',
  },
});
