// screens/ScanScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Lightning, Image as ImageIcon, Info, Scan } from 'phosphor-react-native';

const { width, height } = Dimensions.get('window');

const PALETTE = {
  bgGradient: ['#E0F7FA', '#81D4FA'],
  darkOverlay: '#1a2a3a', 
  accent: '#00E5FF', 
  white: '#FFFFFF',
  secondary: '#1C4D8D',
  footerBg: '#0F2854', // Warna background footer
};

export default function ScanScreen() {
  return (
    <View style={styles.container}>
      {/* 1. Header (Tetap sama) */}
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>AI Scanner</Text>
          <Text style={styles.headerSub}>Identify your waste type</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn}>
          <Lightning size={24} color={PALETTE.white} weight="fill" />
        </TouchableOpacity>
      </View>

      {/* 2. Camera Preview (Mengisi sisa ruang di atas footer) */}
      <View style={styles.cameraPreview}>
        <LinearGradient
          colors={['transparent', 'rgba(0, 229, 255, 0.4)', 'transparent']}
          start={{x: 0, y: 0}} end={{x: 1, y: 0}}
          style={styles.scanLaser}
        />

        <View style={styles.scanFrame}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>

        {/* Status Tag dipindah ke dalam preview agar aman */}
        <View style={styles.statusTag}>
          <Scan size={16} color={PALETTE.accent} style={{marginRight:6}} />
          <Text style={styles.statusText}>Searching Object...</Text>
        </View>
        
        {/* Hint text ditaruh di sini supaya tidak ketutupan tombol */}
        <Text style={styles.hintText}>Place item inside the frame</Text>
      </View>

      {/* 3. Controls Area (Footer) 
          Area ini sekarang punya paddingBottom besar agar tombol naik ke atas
      */}
      <View style={styles.controlsArea}>
        <TouchableOpacity style={styles.sideBtn}>
          <ImageIcon size={26} color={PALETTE.white} weight="duotone" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.shutterContainer} activeOpacity={0.8}>
          <View style={styles.shutterOuter}>
             <View style={styles.shutterInner} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sideBtn}>
          <Info size={26} color={PALETTE.white} weight="duotone" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PALETTE.footerBg }, // Background container disamakan dengan footer
  
  header: {
    position: 'absolute', top: 50, left: 20, right: 20, zIndex: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  headerTextContainer: { flex: 1 },
  headerTitle: { fontFamily: 'Nunito-ExtraBold', fontSize: 24, color: '#FFF', textShadowColor: 'rgba(0,0,0,0.3)', textShadowRadius: 4 },
  headerSub: { fontFamily: 'Nunito-SemiBold', fontSize: 14, color: '#DEF', marginTop: 2 },
  iconBtn: { padding: 10, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 50 },

  /* Camera Preview */
  cameraPreview: {
    flex: 1, // Mengambil sisa ruang flex
    backgroundColor: PALETTE.darkOverlay, 
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    marginBottom: -30, // Sedikit overlap ke bawah agar terlihat menyatu
    zIndex: 1, // Di atas footer background, tapi konten footer nanti di atas ini
  },
  
  scanFrame: { width: width * 0.75, height: width * 0.75, position: 'relative' },
  corner: { position: 'absolute', width: 40, height: 40, borderColor: PALETTE.accent, borderWidth: 4, borderRadius: 4 },
  topLeft: { top: 0, left: 0, borderBottomWidth: 0, borderRightWidth: 0 },
  topRight: { top: 0, right: 0, borderBottomWidth: 0, borderLeftWidth: 0 },
  bottomLeft: { bottom: 0, left: 0, borderTopWidth: 0, borderRightWidth: 0 },
  bottomRight: { bottom: 0, right: 0, borderTopWidth: 0, borderLeftWidth: 0 },

  scanLaser: {
    position: 'absolute', top: '40%', width: '100%', height: 40, zIndex: 0,
    transform: [{ rotate: '-10deg' }]
  },

  statusTag: {
    position: 'absolute', bottom: 80, // Naikkan posisi tag
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(0, 229, 255, 0.15)',
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    borderWidth: 1, borderColor: 'rgba(0, 229, 255, 0.3)'
  },
  statusText: { fontFamily: 'Nunito-Bold', color: PALETTE.accent, fontSize: 14, letterSpacing: 1 },

  hintText: {
    position: 'absolute', bottom: 40, alignSelf: 'center',
    fontFamily: 'Nunito-Regular', color: 'rgba(255,255,255,0.6)', fontSize: 12
  },

  /* Bottom Controls Fixed */
  controlsArea: {
    backgroundColor: PALETTE.footerBg, // Warna footer gelap
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    
    // PERBAIKAN UTAMA DISINI:
    paddingTop: 40,        // Jarak dari lengkungan kamera
    paddingBottom: 110,    // <--- Memberi ruang untuk Navbar App.js (90px) + Jarak aman (20px)
    
    zIndex: 0, // Footer layer paling belakang
  },
  
  sideBtn: { width: 50, height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.1)' },
  
  shutterContainer: {
    width: 80, height: 80,
    alignItems: 'center', justifyContent: 'center',
    // Tidak perlu margin bottom lagi karena sudah dihandle padding container
  },
  shutterOuter: {
    width: 72, height: 72,
    borderRadius: 36,
    borderWidth: 4, borderColor: '#FFF',
    alignItems: 'center', justifyContent: 'center',
  },
  shutterInner: {
    width: 56, height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF',
  },
});