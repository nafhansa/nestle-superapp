// screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// Swapped CircleWavyCheck for CheckCircle to prevent import errors
import { Crown, Trophy, CaretUp, CheckCircle } from 'phosphor-react-native';

const { width } = Dimensions.get('window');

// Enhanced Mock Data with Images
const LEADERS = [
  { id: '1', name: 'Alya', points: 7540, rank: 1, avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Budi', points: 5250, rank: 2, avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Citra', points: 5180, rank: 3, avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Dedi', points: 4720, rank: 4, avatar: 'https://i.pravatar.cc/150?u=8' },
  { id: '5', name: 'EcoBuddy', points: 1650, rank: 5, avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: '6', name: 'Fani', points: 930, rank: 6, avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: '7', name: 'Gina', points: 210, rank: 7, avatar: 'https://i.pravatar.cc/150?u=7' },
  { id: '8', name: 'Hadi', points: 150, rank: 8, avatar: 'https://i.pravatar.cc/150?u=8' },
];

export default function ProfileScreen() {
  const top3 = LEADERS.slice(0, 3);
  const rest = LEADERS.slice(3);

  const renderPodiumUser = (user, position) => {
    const isFirst = position === 1;
    
    // Adjusted Dimensions for a sleeker look
    const avatarSize = isFirst ? 65 : 45; 
    const pillarHeight = isFirst ? 120 : position === 2 ? 90 : 70;
    
    // Modern Gradient Configs
    const gradients = {
      1: ['#FFD700', '#FDB931', '#FFFACD'], // Gold
      2: ['#A0C4FF', '#BDE0FE', '#E2F2FF'], // Silver
      3: ['#FFB7B2', '#FFDAC1', '#FFF0F0']  // Bronze
    };
    
    const borderColor = position === 1 ? '#FFD700' : position === 2 ? '#A0C4FF' : '#FFB7B2';

    return (
      <View key={user.id} style={[styles.podiumItem, { zIndex: isFirst ? 20 : 10 }]}>
        {/* Floating Crown with Glow Effect */}
        {isFirst && (
          <View style={styles.crownWrapper}>
            <View style={styles.crownGlow} />
            {/* Added defensive check for Crown component */}
            {Crown && <Crown size={36} color="#FFD700" weight="fill" />}
          </View>
        )}

        {/* Avatar */}
        <View style={[styles.avatarContainer, { width: avatarSize, height: avatarSize, borderColor }]}>
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>{user.name[0]}</Text>
            </View>
          )}
          {isFirst && (
            <View style={styles.badgeIcon}>
               {/* Changed to CheckCircle which is more standard */}
               <CheckCircle size={16} color="#FFF" weight="fill" /> 
            </View>
          )}
        </View>
        
        <Text style={styles.podiumName} numberOfLines={1}>{user.name}</Text>
        <View style={styles.pillPoints}>
           <Text style={styles.pillText}>{user.points}</Text>
        </View>

        {/* Pillar */}
        <LinearGradient
          colors={gradients[position]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.podiumPillar, { height: pillarHeight }]}
        >
          <Text style={[styles.podiumRank, { color: isFirst ? '#B7950B' : '#555' }]}>{user.rank}</Text>
        </LinearGradient>
      </View>
    );
  };

  const renderRow = ({ item }) => {
    const isMe = item.name === 'EcoBuddy';
    return (
      <View style={[styles.row, isMe && styles.myRow]}>
        <View style={styles.rankContainer}>
          <Text style={[styles.rankText, isMe && styles.myRankText]}>{item.rank}</Text>
          {item.rank <= 5 && <CaretUp size={12} color="#10B981" weight="bold" style={{marginTop:2}}/>}
        </View>
        
        <Image 
          source={item.avatar ? { uri: item.avatar } : null} 
          style={styles.listAvatar} 
          defaultSource={null} 
        />
        {!item.avatar && (
            <View style={[styles.listAvatar, styles.listAvatarPlaceholder]}>
                 <Text style={{color: '#4988C4', fontWeight:'bold'}}>{item.name[0]}</Text>
            </View>
        )}
        
        <View style={styles.userInfo}>
          <Text style={styles.rowName}>{item.name}</Text>
          {isMe && <View style={styles.youBadge}><Text style={styles.youText}>YOU</Text></View>}
        </View>

        <Text style={styles.rowPoints}>{item.points} <Text style={styles.ptsLabel}>pts</Text></Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Background */}
      <LinearGradient
        colors={['#F0F8FF', '#D6EBFF', '#A6C8FF']}
        style={styles.background}
      />

      <View style={styles.header}>
        <View style={styles.headerIconContainer}>
            <Trophy size={24} color="#0F2854" weight="duotone"/>
        </View>
        <View>
            <Text style={styles.headerTitle}>Leaderboard</Text>
            <Text style={styles.headerSubtitle}>Weekly Recycle Challenge</Text>
        </View>
      </View>

      {/* Podium */}
      <View style={styles.podiumContainer}>
        {renderPodiumUser(top3[1], 2)}
        {renderPodiumUser(top3[0], 1)}
        {renderPodiumUser(top3[2], 3)}
      </View>

      {/* List */}
      <View style={styles.listWrapper}>
        <View style={styles.listHandle} />
        <FlatList
          data={rest}
          keyExtractor={i => i.id}
          renderItem={renderRow}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { position: 'absolute', width: '100%', height: '100%' },
  
  /* --- HEADER (Disesuaikan Jaraknya) --- */
  header: { 
    paddingTop: 30, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 24,
    // Menambah jarak bawah agar Header tidak tertabrak Mahkota
    paddingBottom: 10, 
    marginBottom: 20, // Sebelumnya 10, ditambah jadi 20
  },
  headerIconContainer: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 10,
    borderRadius: 14,
    marginRight: 16
  },
  headerTitle: { fontFamily: 'Nunito-ExtraBold', fontSize: 22, color: '#0F2854', fontWeight: '800' },
  headerSubtitle: { fontFamily: 'Nunito-SemiBold', fontSize: 13, color: '#4988C4', marginTop: 2 },

  /* --- PODIUM (Turun ke bawah) --- */
  podiumContainer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'flex-end', 
    marginBottom: 20,
    marginTop: 30,
  },
  podiumItem: { alignItems: 'center', marginHorizontal: 4 },
  
  // Crown tetap menempel di atas avatar, tapi karena podiumContainer turun, dia ikut turun
  crownWrapper: { 
    position: 'absolute', 
    top: -26, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  crownGlow: { 
    position: 'absolute', width: 32, height: 32, borderRadius: 16, 
    backgroundColor: '#FFD700', opacity: 0.3, transform: [{scale: 1.5}] 
  },
  
  avatarContainer: { 
    borderWidth: 3, borderRadius: 50, padding: 2, backgroundColor: '#FFF', marginBottom: 6,
    shadowColor: '#000', shadowOffset: {width:0, height:4}, shadowOpacity:0.15, elevation: 6
  },
  avatarImage: { width: '100%', height: '100%', borderRadius: 50 },
  avatarPlaceholder: { width: '100%', height: '100%', borderRadius: 50, backgroundColor: '#E1EFFF', alignItems: 'center', justifyContent: 'center'},
  avatarInitial: { fontWeight: 'bold', color: '#4988C4'},
  
  badgeIcon: {
      position: 'absolute', bottom: -2, right: -2, backgroundColor: '#2196F3', borderRadius: 8, padding: 1, borderWidth: 2, borderColor: '#FFF'
  },

  podiumName: { fontFamily: 'Nunito-Bold', fontSize: 12, color: '#0F2854', marginBottom: 2, fontWeight: '700' },
  pillPoints: { 
      backgroundColor: 'rgba(255,255,255,0.7)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, marginBottom: 4
  },
  pillText: { fontSize: 10, fontWeight: '800', color: '#0F2854' },

  podiumPillar: { 
    width: width * 0.22, 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10, 
    alignItems: 'center', 
    paddingTop: 10, 
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  podiumRank: { fontFamily: 'Nunito-ExtraBold', fontSize: 28, fontWeight: 'bold', opacity: 0.5 },

  /* List Area */
  listWrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, elevation: 15,
  },
  listHandle: { width: 40, height: 4, backgroundColor: '#E0E0E0', alignSelf: 'center', marginTop: 12, borderRadius: 2 },
  listContent: { padding: 20, paddingBottom: 50 },
  
  row: { flexDirection: 'row', alignItems: 'center', padding: 14, marginBottom: 12, backgroundColor: '#fff', borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, elevation: 2, borderWidth: 1, borderColor: '#F5F5F5' },
  myRow: { backgroundColor: '#F0F9FF', borderColor: '#BAE6FD', borderWidth: 1 },
  rankContainer: { width: 30, alignItems: 'center', marginRight: 8 },
  rankText: { fontSize: 16, fontWeight: '800', color: '#94A3B8' },
  myRankText: { color: '#0284C7' },

  listAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  listAvatarPlaceholder: { backgroundColor: '#E0F2FE', alignItems: 'center', justifyContent: 'center' },

  userInfo: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  rowName: { fontSize: 15, fontWeight: '700', color: '#334155' },
  
  youBadge: { backgroundColor: '#E0F2FE', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginLeft: 8 },
  youText: { fontSize: 10, fontWeight: 'bold', color: '#0284C7' },

  rowPoints: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  ptsLabel: { fontSize: 11, fontWeight: '600', color: '#94A3B8' },
});