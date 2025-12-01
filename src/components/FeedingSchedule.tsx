import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';

const { width } = Dimensions.get('window');

interface FeedingEntry {
  id: string;
  horseName: string;
  time: string;
  food: string;
  supplements: string;
  water: boolean;
  completed: boolean;
  barn: string;
}

const feedingSchedule: FeedingEntry[] = [
  // Morning (6:00 AM)
  { id: '1', horseName: 'Thunder', time: '6:00 AM', food: 'Hay (5 lbs) + Grain (2 lbs)', supplements: 'Joint support', water: true, completed: true, barn: 'Barn A' },
  { id: '2', horseName: 'Bella', time: '6:00 AM', food: 'Hay (4 lbs) + Grain (1.5 lbs)', supplements: 'None', water: true, completed: true, barn: 'Barn A' },
  { id: '3', horseName: 'Storm', time: '6:00 AM', food: 'Hay (4.5 lbs) + Grain (2 lbs)', supplements: 'Probiotics', water: true, completed: true, barn: 'Barn B' },
  { id: '4', horseName: 'Luna', time: '6:00 AM', food: 'Hay (4 lbs) + Grain (1.5 lbs)', supplements: 'Vitamins', water: true, completed: true, barn: 'Barn C' },
  { id: '5', horseName: 'Max', time: '6:00 AM', food: 'Hay (6 lbs) + Grain (3 lbs)', supplements: 'Weight gain', water: true, completed: false, barn: 'Medical Barn' },
  { id: '6', horseName: 'Spirit', time: '6:00 AM', food: 'Hay (5 lbs) + Grain (2 lbs)', supplements: 'None', water: true, completed: true, barn: 'Barn B' },
  
  // Midday (12:00 PM)
  { id: '7', horseName: 'Thunder', time: '12:00 PM', food: 'Hay (3 lbs)', supplements: 'None', water: true, completed: true, barn: 'Barn A' },
  { id: '8', horseName: 'Bella', time: '12:00 PM', food: 'Hay (3 lbs)', supplements: 'None', water: true, completed: true, barn: 'Barn A' },
  { id: '9', horseName: 'Storm', time: '12:00 PM', food: 'Hay (3 lbs)', supplements: 'None', water: true, completed: false, barn: 'Barn B' },
  { id: '10', horseName: 'Luna', time: '12:00 PM', food: 'Hay (3 lbs)', supplements: 'None', water: true, completed: false, barn: 'Barn C' },
  { id: '11', horseName: 'Max', time: '12:00 PM', food: 'Hay (4 lbs) + Grain (1 lb)', supplements: 'Electrolytes', water: true, completed: false, barn: 'Medical Barn' },
  { id: '12', horseName: 'Spirit', time: '12:00 PM', food: 'Hay (3 lbs)', supplements: 'None', water: true, completed: false, barn: 'Barn B' },
  
  // Evening (6:00 PM)
  { id: '13', horseName: 'Thunder', time: '6:00 PM', food: 'Hay (5 lbs) + Grain (2 lbs)', supplements: 'Vitamins', water: true, completed: false, barn: 'Barn A' },
  { id: '14', horseName: 'Bella', time: '6:00 PM', food: 'Hay (4 lbs) + Grain (1.5 lbs)', supplements: 'Coat supplement', water: true, completed: false, barn: 'Barn A' },
  { id: '15', horseName: 'Storm', time: '6:00 PM', food: 'Hay (4.5 lbs) + Grain (2 lbs)', supplements: 'Probiotics', water: true, completed: false, barn: 'Barn B' },
  { id: '16', horseName: 'Luna', time: '6:00 PM', food: 'Hay (4 lbs) + Grain (1.5 lbs)', supplements: 'Vitamins', water: true, completed: false, barn: 'Barn C' },
  { id: '17', horseName: 'Max', time: '6:00 PM', food: 'Hay (6 lbs) + Grain (3 lbs)', supplements: 'Weight gain', water: true, completed: false, barn: 'Medical Barn' },
  { id: '18', horseName: 'Spirit', time: '6:00 PM', food: 'Hay (5 lbs) + Grain (2 lbs)', supplements: 'None', water: true, completed: false, barn: 'Barn B' },
];

export function FeedingSchedule() {
  const [entries, setEntries] = useState(feedingSchedule);
  const [selectedTime, setSelectedTime] = useState<string>('all');

  const toggleComplete = (id: string) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, completed: !entry.completed } : entry
    ));
  };

  const times = ['6:00 AM', '12:00 PM', '6:00 PM'];
  
  const filteredEntries = selectedTime === 'all' 
    ? entries 
    : entries.filter(entry => entry.time === selectedTime);

  const groupedByTime = times.reduce((acc, time) => {
    acc[time] = entries.filter(entry => entry.time === time);
    return acc;
  }, {} as Record<string, FeedingEntry[]>);

  const getTimeStats = (time: string) => {
    const timeEntries = groupedByTime[time];
    const completed = timeEntries.filter(e => e.completed).length;
    const total = timeEntries.length;
    return { completed, total, percentage: Math.round((completed / total) * 100) };
  };

  const overallStats = {
    total: entries.length,
    completed: entries.filter(e => e.completed).length,
    pending: entries.filter(e => !e.completed).length,
  };

  const getCurrentFeeding = () => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour < 12) return '6:00 AM';
    if (hour < 18) return '12:00 PM';
    return '6:00 PM';
  };

  const currentFeeding = getCurrentFeeding();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Feeding Schedule</Text>
        <Text style={styles.subtitle}>Daily feeding tracker for all horses</Text>
      </View>

      {/* Overall Stats */}
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <CardContent style={styles.statContent}>
            <View style={styles.statRow}>
              <View style={styles.statTextContainer}>
                <Text style={styles.statLabel}>Total Feedings</Text>
                <Text style={styles.statValue}>{overallStats.total}</Text>
              </View>
            </View>
          </CardContent>
        </Card>
        <Card style={styles.statCard}>
          <CardContent style={styles.statContent}>
            <View style={styles.statRow}>
              <View style={styles.statTextContainer}>
                <Text style={styles.statLabel}>Completed</Text>
                <Text style={styles.statValue}>{overallStats.completed}</Text>
              </View>
            </View>
          </CardContent>
        </Card>
        <Card style={styles.statCard}>
          <CardContent style={styles.statContent}>
            <View style={styles.statRow}>
              <View style={styles.statTextContainer}>
                <Text style={styles.statLabel}>Pending</Text>
                <Text style={styles.statValue}>{overallStats.pending}</Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>

      {/* Time-based Progress */}
      <Card style={styles.progressCard}>
        <CardHeader>
          <CardTitle>Progress by Feeding Time</CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.progressGrid}>
            {times.map((time, index) => {
              const stats = getTimeStats(time);
              const isCurrent = time === currentFeeding;
              return (
                <View 
                  key={time} 
                  style={[
                    styles.progressItem,
                    isCurrent && styles.progressItemCurrent,
                    index < times.length - 1 && styles.progressItemSpacing
                  ]}
                >
                  <View style={styles.progressHeader}>
                    <View style={styles.progressTimeRow}>
                      <Text style={[styles.progressTime, isCurrent && styles.progressTimeCurrent]}>
                        {time}
                      </Text>
                    </View>
                    {isCurrent && (
                      <Badge className="bg-emerald">
                        Current
                      </Badge>
                    )}
                  </View>
                  <View style={styles.progressStats}>
                    <View style={styles.progressStatsRow}>
                      <Text style={styles.progressLabel}>Progress</Text>
                      <Text style={[styles.progressValue, isCurrent && styles.progressValueCurrent]}>
                        {stats.completed}/{stats.total}
                      </Text>
                    </View>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressBarFill,
                          { width: `${stats.percentage}%` },
                          isCurrent && styles.progressBarFillCurrent
                        ]}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </CardContent>
      </Card>

      {/* Filter Buttons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTime('all')}
          style={[styles.filterButton, selectedTime === 'all' && styles.filterButtonActive]}
        >
          <Text style={[styles.filterButtonText, selectedTime === 'all' && styles.filterButtonTextActive]}>
          All Times
          </Text>
        </TouchableOpacity>
        {times.map(time => (
          <TouchableOpacity
            key={time}
            onPress={() => setSelectedTime(time)}
            style={[styles.filterButton, selectedTime === time && styles.filterButtonActive]}
          >
            <Text style={[styles.filterButtonText, selectedTime === time && styles.filterButtonTextActive]}>
            {time}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Feeding List */}
      <Card style={styles.feedingListCard}>
        <CardHeader>
          <CardTitle>
            {selectedTime === 'all' ? 'All Feedings' : `${selectedTime} Feeding`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <View style={styles.feedingList}>
            {filteredEntries.map((entry) => (
              <View 
                key={entry.id} 
                style={[
                  styles.feedingItem,
                  entry.completed && styles.feedingItemCompleted
                ]}
              >
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    checked={entry.completed}
                    onCheckedChange={() => toggleComplete(entry.id)}
                  />
                </View>
                
                <View style={styles.feedingContent}>
                  <View style={styles.feedingHeader}>
                    <View style={styles.feedingTitleContainer}>
                      <Text style={[
                        styles.feedingHorseName,
                        entry.completed && styles.feedingHorseNameCompleted
                      ]}>
                        {entry.horseName}
                      </Text>
                      <Text style={styles.feedingBarn}>{entry.barn}</Text>
                    </View>
                    <View style={styles.feedingTimeContainer}>
                      <Text style={styles.feedingTimeText}>{entry.time}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.feedingDetails}>
                    <View style={styles.feedingDetailRow}>
                      <Text style={styles.feedingDetailText}>{entry.food}</Text>
                    </View>
                      
                      {entry.supplements !== 'None' && (
                      <View style={styles.feedingDetailRow}>
                        <Text style={styles.feedingDetailText}>
                          Supplements: {entry.supplements}
                        </Text>
                      </View>
                      )}
                      
                      {entry.water && (
                      <View style={styles.feedingDetailRow}>
                        <Text style={styles.feedingDetailText}>Fresh water check required</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </CardContent>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Container & Layout
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 16,
  },
  
  // Header
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  
  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: (width - 32 - 16) / 3, // (screen_width - 2*padding - 2*gap) / 3
    marginBottom: 12,
  },
  statContent: {
    padding: 14,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 48,
  },
  statTextContainer: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  
  // Progress Card
  progressCard: {
    marginBottom: 24,
  },
  progressGrid: {
    // No gap property - using marginBottom on items instead
  },
  progressItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  progressItemSpacing: {
    marginBottom: 12,
  },
  progressItemCurrent: {
    borderColor: '#059669',
    backgroundColor: '#ecfdf5',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTime: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  progressTimeCurrent: {
    color: '#047857',
  },
  progressStats: {
    marginTop: 4,
  },
  progressStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    color: '#6b7280',
  },
  progressValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  progressValueCurrent: {
    color: '#047857',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#9ca3af',
    borderRadius: 3,
  },
  progressBarFillCurrent: {
    backgroundColor: '#059669',
  },
  
  // Filter Buttons
  filterContainer: {
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
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
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  
  // Feeding List
  feedingListCard: {
    marginBottom: 16,
  },
  feedingList: {
    // No gap property - using marginBottom on items instead
  },
  feedingItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  feedingItemCompleted: {
    backgroundColor: '#f9fafb',
    borderColor: '#e5e7eb',
    opacity: 0.7,
  },
  checkboxContainer: {
    marginTop: 2,
  },
  feedingContent: {
    flex: 1,
    marginLeft: 12,
  },
  feedingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  feedingTitleContainer: {
    flex: 1,
  },
  feedingHorseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  feedingHorseNameCompleted: {
    textDecorationLine: 'line-through',
    color: '#6b7280',
  },
  feedingBarn: {
    fontSize: 13,
    color: '#6b7280',
  },
  feedingTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    flexShrink: 0,
    justifyContent: 'center',
  },
  feedingTimeText: {
    fontSize: 13,
    color: '#6b7280',
  },
  feedingDetails: {
    marginTop: 2,
  },
  feedingDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    minHeight: 24,
  },
  feedingDetailText: {
    fontSize: 13,
    color: '#374151',
    flex: 1,
    lineHeight: 18,
  },
});
