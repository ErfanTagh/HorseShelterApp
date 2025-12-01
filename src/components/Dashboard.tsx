import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export function Dashboard() {
  const navigation = useNavigation();

  const stats = [
    { label: 'Total Horses', value: '24', icon: 'paw', color: '#3b82f6', trend: '+2 this month' },
    { label: 'Healthy', value: '21', icon: 'check-circle', color: '#10b981', trend: '87.5%' },
    { label: 'Need Attention', value: '3', icon: 'alert-circle', color: '#f59e0b', trend: 'Down from 5' },
    { label: 'Adoptions YTD', value: '18', icon: 'heart', color: '#ec4899', trend: '+3 from last year' },
  ];

  const recentActivity = [
    { id: 1, horse: 'Thunder', action: 'Veterinary checkup completed', time: '2 hours ago', type: 'health' },
    { id: 2, horse: 'Bella', action: 'Feeding schedule updated', time: '4 hours ago', type: 'feeding' },
    { id: 3, horse: 'Storm', action: 'New adoption application received', time: '5 hours ago', type: 'adoption' },
    { id: 4, horse: 'Luna', action: 'Vaccination administered', time: '1 day ago', type: 'health' },
    { id: 5, horse: 'Max', action: 'Health alert: Low weight detected', time: '1 day ago', type: 'alert' },
  ];

  const upcomingTasks = [
    { id: 1, task: 'Farrier appointment for Thunder', date: 'Today, 2:00 PM', priority: 'high' },
    { id: 2, task: 'Deworming schedule for 8 horses', date: 'Tomorrow', priority: 'medium' },
    { id: 3, task: 'Dental checkup for Luna and Bella', date: 'Dec 5', priority: 'medium' },
    { id: 4, task: 'Review adoption applications', date: 'Dec 6', priority: 'low' },
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'alert': return '#ef4444';
      case 'health': return '#10b981';
      case 'adoption': return '#ec4899';
      default: return '#3b82f6';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return { bg: '#fee2e2', text: '#991b1b' };
      case 'medium': return { bg: '#fef3c7', text: '#92400e' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Here's what's happening with your shelter today.</Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <Card key={index} style={styles.statCard}>
            <CardContent style={styles.statContent}>
              <View style={styles.statRow}>
                <View style={styles.statInfo}>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <View style={styles.statTrend}>
                    <MaterialIcons name="trending-up" size={16} color="#6b7280" />
                    <Text style={styles.trendText}>{stat.trend}</Text>
                  </View>
                </View>
                <View style={[styles.statIconContainer, { backgroundColor: stat.color }]}>
                  <MaterialCommunityIcons name={stat.icon as any} size={24} color="#ffffff" />
                </View>
              </View>
            </CardContent>
          </Card>
        ))}
      </View>

      <View style={styles.mainGrid}>
        {/* Recent Activity */}
        <Card style={styles.activityCard}>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.activityList}>
              {recentActivity.map((activity) => (
                <View key={activity.id} style={styles.activityItem}>
                  <View style={[styles.activityDot, { backgroundColor: getActivityColor(activity.type) }]} />
                  <View style={styles.activityContent}>
                    <Text style={styles.activityHorse}>{activity.horse}</Text>
                    <Text style={styles.activityAction}>{activity.action}</Text>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card style={styles.tasksCard}>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.tasksList}>
              {upcomingTasks.map((task) => {
                const priorityStyle = getPriorityColor(task.priority);
                return (
                  <View key={task.id} style={styles.taskItem}>
                    <MaterialIcons name="event" size={16} color="#9ca3af" style={styles.taskIcon} />
                    <View style={styles.taskContent}>
                      <Text style={styles.taskText}>{task.task}</Text>
                      <Text style={styles.taskDate}>{task.date}</Text>
                    </View>
                    <View style={[styles.priorityBadge, { backgroundColor: priorityStyle.bg }]}>
                      <Text style={[styles.priorityText, { color: priorityStyle.text }]}>
                        {task.priority}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </CardContent>
        </Card>
      </View>

      {/* Quick Actions Banner */}
      <Card style={styles.quickActionsCard}>
        <CardContent style={styles.quickActionsContent}>
          <View style={styles.quickActionsRow}>
            <View style={styles.quickActionsInfo}>
              <Text style={styles.quickActionsTitle}>Quick Actions</Text>
              <Text style={styles.quickActionsSubtitle}>Jump to the most common tasks</Text>
              <View style={styles.quickActionsButtons}>
                <TouchableOpacity
                  style={styles.quickActionButton}
                  onPress={() => navigation.navigate('Roster' as never)}
                >
                  <Text style={styles.quickActionButtonText}>View All Horses</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.quickActionButton, styles.quickActionButtonSecondary]}
                  onPress={() => navigation.navigate('Health' as never)}
                >
                  <Text style={[styles.quickActionButtonText, styles.quickActionButtonTextSecondary]}>
                    Health Records
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </CardContent>
      </Card>
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
    marginHorizontal: -8,
    marginBottom: 24,
  },
  statCard: {
    width: (width - 48) / 2,
    margin: 8,
  },
  statContent: {
    padding: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statInfo: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
  },
  statTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  trendText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainGrid: {
    marginBottom: 24,
  },
  activityCard: {
    marginBottom: 16,
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 8,
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityHorse: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  activityAction: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  tasksCard: {
    marginBottom: 16,
  },
  tasksList: {
    gap: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  taskIcon: {
    marginTop: 2,
    marginRight: 12,
  },
  taskContent: {
    flex: 1,
  },
  taskText: {
    fontSize: 14,
    color: '#111827',
  },
  taskDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  quickActionsCard: {
    backgroundColor: '#059669',
    marginBottom: 16,
  },
  quickActionsContent: {
    padding: 24,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quickActionsInfo: {
    flex: 1,
  },
  quickActionsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  quickActionsSubtitle: {
    fontSize: 14,
    color: '#d1fae5',
    marginTop: 4,
  },
  quickActionsButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  quickActionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  quickActionButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  quickActionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  quickActionButtonTextSecondary: {
    color: '#ffffff',
  },
});
