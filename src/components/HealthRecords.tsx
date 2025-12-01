import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Badge } from './ui/badge';

interface HealthRecord {
  id: string;
  horseName: string;
  date: string;
  type: 'checkup' | 'vaccination' | 'treatment' | 'dental' | 'emergency';
  description: string;
  veterinarian: string;
  status: 'completed' | 'scheduled' | 'urgent';
  notes?: string;
}

const healthRecords: HealthRecord[] = [
  {
    id: '1',
    horseName: 'Thunder',
    date: '2024-11-15',
    type: 'checkup',
    description: 'Annual veterinary examination',
    veterinarian: 'Dr. Sarah Johnson',
    status: 'completed',
    notes: 'All vitals normal. Horse in excellent condition.',
  },
  {
    id: '2',
    horseName: 'Bella',
    date: '2024-12-05',
    type: 'vaccination',
    description: 'Flu and tetanus booster',
    veterinarian: 'Dr. Michael Chen',
    status: 'scheduled',
  },
  {
    id: '3',
    horseName: 'Max',
    date: '2024-11-28',
    type: 'treatment',
    description: 'Monitoring weight loss - nutritional support',
    veterinarian: 'Dr. Sarah Johnson',
    status: 'urgent',
    notes: 'Weight down 50 lbs in 2 weeks. Increased feed portions and monitoring daily.',
  },
  {
    id: '4',
    horseName: 'Storm',
    date: '2024-11-20',
    type: 'dental',
    description: 'Routine dental floating',
    veterinarian: 'Dr. Emily Rodriguez',
    status: 'completed',
  },
  {
    id: '5',
    horseName: 'Luna',
    date: '2024-11-10',
    type: 'vaccination',
    description: 'West Nile virus vaccination',
    veterinarian: 'Dr. Michael Chen',
    status: 'completed',
  },
  {
    id: '6',
    horseName: 'Spirit',
    date: '2024-12-08',
    type: 'checkup',
    description: 'Quarterly health assessment',
    veterinarian: 'Dr. Sarah Johnson',
    status: 'scheduled',
  },
  {
    id: '7',
    horseName: 'Daisy',
    date: '2024-11-25',
    type: 'treatment',
    description: 'Minor hoof abscess treatment',
    veterinarian: 'Dr. Sarah Johnson',
    status: 'completed',
    notes: 'Abscess drained and treated. Horse walking normally. Follow-up in 1 week.',
  },
  {
    id: '8',
    horseName: 'Rocky',
    date: '2024-12-02',
    type: 'checkup',
    description: 'Senior horse wellness exam',
    veterinarian: 'Dr. Emily Rodriguez',
    status: 'scheduled',
  },
];

const upcomingVaccinations = [
  { horse: 'Thunder', vaccine: 'Flu booster', dueDate: '2024-12-15', status: 'due-soon' },
  { horse: 'Bella', vaccine: 'Tetanus', dueDate: '2024-12-05', status: 'due-soon' },
  { horse: 'Max', vaccine: 'West Nile', dueDate: '2024-12-20', status: 'scheduled' },
  { horse: 'Storm', vaccine: 'Rabies', dueDate: '2025-01-10', status: 'scheduled' },
];

export function HealthRecords() {
  const [activeTab, setActiveTab] = useState('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'checkup':
        return <MaterialIcons name="healing" size={20} color="#3b82f6" />;
      case 'vaccination':
        return <MaterialIcons name="vaccines" size={20} color="#9333ea" />;
      case 'treatment':
        return <MaterialIcons name="medication" size={20} color="#f97316" />;
      case 'dental':
        return <MaterialIcons name="fitness-center" size={20} color="#14b8a6" />;
      case 'emergency':
        return <MaterialIcons name="warning" size={20} color="#ef4444" />;
      default:
        return <MaterialIcons name="fitness-center" size={20} color="#6b7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'urgent':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'checkup':
        return { bg: '#dbeafe', icon: '#3b82f6' };
      case 'vaccination':
        return { bg: '#f3e8ff', icon: '#9333ea' };
      case 'treatment':
        return { bg: '#fed7aa', icon: '#f97316' };
      case 'dental':
        return { bg: '#ccfbf1', icon: '#14b8a6' };
      case 'emergency':
        return { bg: '#fee2e2', icon: '#ef4444' };
      default:
        return { bg: '#f3f4f6', icon: '#6b7280' };
    }
  };

  const filteredRecords = activeTab === 'all' 
    ? healthRecords 
    : healthRecords.filter(record => record.status === activeTab);

  const stats = {
    total: healthRecords.length,
    completed: healthRecords.filter(r => r.status === 'completed').length,
    scheduled: healthRecords.filter(r => r.status === 'scheduled').length,
    urgent: healthRecords.filter(r => r.status === 'urgent').length,
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Health Records</Text>
        <Text style={styles.subtitle}>Track veterinary visits, treatments, and vaccinations</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <CardContent style={styles.statContent}>
            <View style={styles.statRow}>
              <View>
                <Text style={styles.statLabel}>Total Records</Text>
                <Text style={styles.statValue}>{stats.total}</Text>
              </View>
              <MaterialIcons name="fitness-center" size={32} color="#9ca3af" />
            </View>
          </CardContent>
        </Card>
        <Card style={styles.statCard}>
          <CardContent style={styles.statContent}>
            <View style={styles.statRow}>
              <View>
                <Text style={styles.statLabel}>Completed</Text>
                <Text style={styles.statValue}>{stats.completed}</Text>
              </View>
              <MaterialIcons name="check-circle" size={32} color="#10b981" />
            </View>
          </CardContent>
        </Card>
        <Card style={styles.statCard}>
          <CardContent style={styles.statContent}>
            <View style={styles.statRow}>
              <View>
                <Text style={styles.statLabel}>Scheduled</Text>
                <Text style={styles.statValue}>{stats.scheduled}</Text>
              </View>
              <MaterialIcons name="event" size={32} color="#3b82f6" />
            </View>
          </CardContent>
        </Card>
        <Card style={styles.statCard}>
          <CardContent style={styles.statContent}>
            <View style={styles.statRow}>
              <View>
                <Text style={styles.statLabel}>Urgent</Text>
                <Text style={styles.statValue}>{stats.urgent}</Text>
              </View>
              <MaterialIcons name="warning" size={32} color="#ef4444" />
            </View>
          </CardContent>
        </Card>
      </View>

      <View style={styles.mainContent}>
        {/* Main Records */}
        <Card style={styles.recordsCard}>
          <CardHeader>
            <CardTitle>Recent Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">
                  All
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed
                </TabsTrigger>
                <TabsTrigger value="scheduled">
                  Scheduled
                </TabsTrigger>
                <TabsTrigger value="urgent">
                  Urgent
                </TabsTrigger>
              </TabsList>

              <View style={styles.recordsList}>
                {filteredRecords.map((record) => {
                  const typeStyle = getTypeColor(record.type);
                  return (
                    <View key={record.id} style={styles.recordCard}>
                      <View style={styles.recordHeader}>
                        <View style={[styles.typeIconContainer, { backgroundColor: typeStyle.bg }]}>
                          {getTypeIcon(record.type)}
                        </View>
                        <View style={styles.recordInfo}>
                          <Text style={styles.recordHorseName}>{record.horseName}</Text>
                          <Text style={styles.recordType}>{record.type}</Text>
                        </View>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </View>
                      
                      <Text style={styles.recordDescription}>{record.description}</Text>
                      
                      <View style={styles.recordMeta}>
                        <View style={styles.recordMetaItem}>
                          <MaterialIcons name="event" size={16} color="#6b7280" />
                          <Text style={styles.recordMetaText}>
                            {new Date(record.date).toLocaleDateString()}
                          </Text>
                        </View>
                        <View style={styles.recordMetaItem}>
                          <MaterialIcons name="healing" size={16} color="#6b7280" />
                          <Text style={styles.recordMetaText}>{record.veterinarian}</Text>
                        </View>
                      </View>

                      {record.notes && (
                        <View style={styles.notesContainer}>
                          <Text style={styles.notesText}>{record.notes}</Text>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            </Tabs>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <View style={styles.sidebar}>
          {/* Upcoming Vaccinations */}
          <Card style={styles.sidebarCard}>
            <CardHeader>
              <CardTitle>Upcoming Vaccinations</CardTitle>
            </CardHeader>
            <CardContent>
              <View style={styles.vaccinationList}>
                {upcomingVaccinations.map((vac, index) => (
                  <View key={index} style={styles.vaccinationItem}>
                    <MaterialIcons name="vaccines" size={16} color="#9333ea" style={styles.vaccinationIcon} />
                    <View style={styles.vaccinationContent}>
                      <Text style={styles.vaccinationHorse}>{vac.horse}</Text>
                      <Text style={styles.vaccinationVaccine}>{vac.vaccine}</Text>
                      <Text style={styles.vaccinationDate}>
                        Due: {new Date(vac.dueDate).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card style={styles.sidebarCard}>
            <CardHeader>
              <CardTitle>This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <View style={styles.monthStats}>
                <View style={styles.monthStatRow}>
                  <Text style={styles.monthStatLabel}>Checkups</Text>
                  <Text style={[styles.monthStatValue, { color: '#059669' }]}>5</Text>
                </View>
                <View style={styles.monthStatRow}>
                  <Text style={styles.monthStatLabel}>Vaccinations</Text>
                  <Text style={[styles.monthStatValue, { color: '#9333ea' }]}>3</Text>
                </View>
                <View style={styles.monthStatRow}>
                  <Text style={styles.monthStatLabel}>Treatments</Text>
                  <Text style={[styles.monthStatValue, { color: '#f97316' }]}>2</Text>
                </View>
                <View style={styles.monthStatRow}>
                  <Text style={styles.monthStatLabel}>Dental</Text>
                  <Text style={[styles.monthStatValue, { color: '#14b8a6' }]}>1</Text>
                </View>
              </View>
            </CardContent>
          </Card>
        </View>
      </View>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 48) / 2 - 6,
    marginBottom: 12,
  },
  statContent: {
    padding: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
  },
  mainContent: {
    marginBottom: 24,
  },
  recordsCard: {
    marginBottom: 16,
  },
  recordsList: {
    gap: 16,
  },
  recordCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginBottom: 12,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  recordInfo: {
    flex: 1,
    flexShrink: 1,
    marginRight: 8,
    minWidth: 0,
  },
  recordHorseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  recordType: {
    fontSize: 14,
    color: '#6b7280',
    textTransform: 'capitalize',
    marginTop: 2,
  },
  recordDescription: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
  },
  recordMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  recordMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recordMetaText: {
    fontSize: 14,
    color: '#6b7280',
  },
  notesContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  notesText: {
    fontSize: 14,
    color: '#374151',
  },
  sidebar: {
    gap: 16,
  },
  sidebarCard: {
    marginBottom: 16,
  },
  vaccinationList: {
    gap: 12,
  },
  vaccinationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  vaccinationIcon: {
    marginTop: 2,
    marginRight: 8,
  },
  vaccinationContent: {
    flex: 1,
  },
  vaccinationHorse: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  vaccinationVaccine: {
    fontSize: 14,
    color: '#6b7280',
  },
  vaccinationDate: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  monthStats: {
    gap: 16,
  },
  monthStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthStatLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  monthStatValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});
