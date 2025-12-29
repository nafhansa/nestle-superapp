// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trash, Wind, Trophy, Sparkle, Plant, Tree } from 'phosphor-react-native';

const { width } = Dimensions.get('window');

const useStore = () => ({
  points: 275,
  user: { name: 'Naila' },
  getTreeStage: () => ({ stage: 2, label: 'Sapling' })
});

const PALETTE = {
  primary: '#4988C4',
  dark: '#0F2854',
  white: '#FFFFFF',
  skyTop: '#E1F5FE',
  skyBottom: '#B3E5FC',
};

export default function HomeScreen() {
  const { points, user, getTreeStage } = useStore();
  const tree = getTreeStage(points);

  // Progress Logic
  const nextThreshold = 500;
  const prevThreshold = 100;
  const rawProgress = (points - prevThreshold) / (nextThreshold - prevThreshold);
  const progress = Math.min(1, Math.max(0, rawProgress));

  const renderTreeIcon = () => {
    if (tree.stage <= 1) return <Plant size={160} color="#81C784" weight="duotone" />;
    // Modified color opacity for more "transparency" feel if needed, or just standard duotone
    return <Tree size={180} color="#66BB6A" weight="duotone" />; 
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Background Atmosphere */}
      <LinearGradient
        colors={[PALETTE.skyTop, '#E0F7FA', PALETTE.skyBottom]}
        style={styles.backgroundGradient}
      />
      {/* Soft Bubbles */}
      <View style={[styles.bubble, { top: 60, left: -50, width: 200, height: 200 }]} />
      <View style={[styles.bubble, { top: 200, right: -80, width: 250, height: 250 }]} />

      {/* Main Content (Fixed Layout - No Scroll) */}
      <View style={styles.mainLayout}>
        
        {/* 1. Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi, {user.name}!</Text>
            <Text style={styles.subGreeting}>Ready to save the earth? 🌱</Text>
          </View>
          
          <View style={styles.glassWidget}>
            <View style={styles.iconCircle}>
              <Trophy size={18} color="#F57F17" weight="fill" />
            </View>
            <View>
              <Text style={styles.pointLabel}>Points</Text>
              <Text style={styles.pointValue}>{points}</Text>
            </View>
          </View>
        </View>

        {/* 2. Hero Section (Flexible Spacer) */}
        {/* flex: 1 ensures the tree stays centered in the available space */}
        <View style={styles.heroSection}>
          {/* Much softer, more transparent glow */}
          <View style={styles.sunGlow} />
          
          <View style={styles.treeContainer}>
             {renderTreeIcon()}
          </View>
          
          {/* Glassy Stage Pill */}
          <View style={styles.stagePill}>
            <Sparkle size={14} color="#FFF" weight="fill" style={{marginRight: 6, opacity: 0.9}} />
            <Text style={styles.stageText}>{tree.label} Phase</Text>
          </View>
        </View>

        {/* 3. Bottom Sheet (Fixed at Bottom) */}
        <View style={styles.bottomSheet}>
          <View style={styles.sheetHandle} />

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Growth Progress</Text>
              <Text style={styles.progressPercent}>{Math.floor(progress * 100)}%</Text>
            </View>
            <View style={styles.track}>
              <LinearGradient
                colors={['#4FC3F7', '#29B6F6']}
                start={{x:0, y:0}} end={{x:1, y:0}}
                style={[styles.bar, { width: `${progress * 100}%` }]}
              />
            </View>
            <Text style={styles.progressSubtitle}>
              {nextThreshold - points} pts until next stage
            </Text>
          </View>

          {/* Stats Grid */}
          <Text style={styles.sectionTitle}>Weekly Impact</Text>
          <View style={styles.grid}>
            <View style={[styles.statCard, styles.cardBlue]}>
              <View style={[styles.statIconBox, { backgroundColor: '#E3F2FD' }]}>
                <Trash size={28} color="#1E88E5" weight="duotone" />
              </View>
              <View>
                <Text style={styles.statValue}>25<Text style={styles.statUnit}>kg</Text></Text>
                <Text style={styles.statLabel}>Recycled</Text>
              </View>
            </View>

            <View style={[styles.statCard, styles.cardGreen]}>
              <View style={[styles.statIconBox, { backgroundColor: '#E8F5E9' }]}>
                <Wind size={28} color="#43A047" weight="duotone" />
              </View>
              <View>
                <Text style={[styles.statValue, { color: '#2E7D32' }]}>12<Text style={styles.statUnit}>kg</Text></Text>
                <Text style={styles.statLabel}>CO₂ Saved</Text>
              </View>
            </View>
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundGradient: { position: 'absolute', left: 0, right: 0, top: 0, height: '100%' },
  
  /* Layout Wrapper */
  mainLayout: { flex: 1, justifyContent: 'space-between' },

  bubble: {
    position: 'absolute',
    borderRadius: 200,
    backgroundColor: '#FFFFFF',
    opacity: 0.2, // Softer bubbles
  },

  /* Header */
  header: {
    paddingTop: 60,
    paddingHorizontal: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: { fontFamily: 'Nunito-ExtraBold', fontSize: 26, color: PALETTE.dark, fontWeight: '800' },
  subGreeting: { fontFamily: 'Nunito-SemiBold', fontSize: 14, color: '#546E7A', fontWeight: '600', marginTop: 2 },

  glassWidget: {
    backgroundColor: 'rgba(255,255,255,0.4)', // More transparent
    paddingVertical: 8, paddingHorizontal: 12,
    borderRadius: 16,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)',
  },
  iconCircle: { marginRight: 8 },
  pointLabel: { fontSize: 10, color: '#546E7A', fontWeight: '700', textTransform: 'uppercase' },
  pointValue: { fontSize: 16, color: PALETTE.dark, fontWeight: '900' },

  /* Hero Section */
  heroSection: { 
    flex: 1, // Takes up remaining space
    alignItems: 'center', 
    justifyContent: 'center', 
    position: 'relative',
    marginTop: -20, // Pull tree up slightly
  },
  
  sunGlow: {
    position: 'absolute',
    width: 240, height: 240,
    borderRadius: 120,
    backgroundColor: '#FFFFFF',
    opacity: 0.2, // Very transparent now (was 0.5)
  },
  
  treeContainer: {
    zIndex: 5,
    marginBottom: 20,
    // Optional: Add shadow to tree itself if desired, or keep it flat/duotone
  },

  stagePill: {
    position: 'absolute', bottom: 20,
    // Very Glassy effect
    backgroundColor: 'rgba(15, 40, 84, 0.4)', // Low opacity dark blue
    paddingHorizontal: 18, paddingVertical: 8,
    borderRadius: 30,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)',
  },
  stageText: { color: '#FFF', fontWeight: '700', fontSize: 13, letterSpacing: 0.5 },

  /* Bottom Sheet */
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 12,
    paddingBottom: 110, // Space for TabBar
    // Shadow pointing up
    shadowColor: '#0F2854', shadowOffset: { width: 0, height: -8 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 15
  },
  sheetHandle: {
    width: 40, height: 4, backgroundColor: '#E0E0E0', borderRadius: 2, alignSelf: 'center', marginBottom: 24
  },

  /* Progress Bar */
  progressContainer: { marginBottom: 24 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'flex-end' },
  progressTitle: { fontSize: 16, fontWeight: '800', color: PALETTE.dark },
  progressPercent: { fontSize: 20, fontWeight: '900', color: PALETTE.primary },
  
  track: { height: 10, backgroundColor: '#F1F5F9', borderRadius: 6, overflow: 'hidden' },
  bar: { height: '100%', borderRadius: 6 },
  progressSubtitle: { marginTop: 6, fontSize: 12, color: '#90A4AE', textAlign: 'right', fontWeight: '600' },

  /* Stats Grid */
  sectionTitle: { fontSize: 18, fontWeight: '800', color: PALETTE.dark, marginBottom: 14 },
  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  
  statCard: {
    width: (width - 56 - 16) / 2, 
    borderRadius: 24,
    padding: 16,
    height: 120, // Slightly shorter to fit
    justifyContent: 'space-between',
  },
  cardBlue: { backgroundColor: '#F3F8FF' }, 
  cardGreen: { backgroundColor: '#F1F8E9' }, 
  
  statIconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  statValue: { fontSize: 24, fontWeight: '900', color: '#1565C0' },
  statUnit: { fontSize: 14, fontWeight: '700', color: '#90CAF9' },
  statLabel: { fontSize: 12, fontWeight: '700', color: '#546E7A' },
});