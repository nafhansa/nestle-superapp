// screens/MapScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, NavigationArrow, Clock, Phone, Crosshair } from 'phosphor-react-native';

const { width, height } = Dimensions.get('window');

const PALETTE = {
  primary: '#4988C4',
  secondary: '#1C4D8D',
  accent: '#FF6B6B', // Warna merah soft untuk Pin aktif
  dark: '#0F2854',
  white: '#FFFFFF',
  mapBg: '#E3F2FD', // Warna tanah peta
  road: '#FFFFFF',  // Warna jalan
};


const LOCATIONS = [
  { id: '1', name: 'Central Bank Sampah', address: 'Jl. Merdeka No. 45', open: '08:00 - 17:00', top: '30%', left: '40%' },
  { id: '2', name: 'Unit Daur Ulang', address: 'Kawasan Eco Park Blok A', open: '09:00 - 15:00', top: '55%', left: '70%' },
  { id: '3', name: 'Drop Point Pasar', address: 'Pasar Modern, Lobby Barat', open: '06:00 - 12:00', top: '20%', left: '75%' },
  { id: '4', name: 'Sekolah Alam Spot', address: 'Jl. Belajar No. 10', open: '08:00 - 16:00', top: '65%', left: '20%' },
];

export default function MapScreen() {
  const [selectedLoc, setSelectedLoc] = useState(LOCATIONS[0]);

  return (
    <View style={styles.container}>
      {/* 1. Header Floating (Absolute) */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Drop-off Points</Text>
        <Text style={styles.headerSub}>Find the nearest recycling dump spot</Text>
      </View>

      {/* 2. THE MAP (Mock Vector Style) */}
      <View style={styles.mapArea}>
        {/* Background Tanah */}
        <View style={styles.mapBackground} />

        {/* Dekorasi: Jalan Raya (Abstract Lines) */}
        <View style={[styles.road, { top: '40%', width: '100%', height: 20, transform: [{ rotate: '10deg' }] }]} />
        <View style={[styles.road, { top: '0%', left: '50%', width: 20, height: '100%', transform: [{ rotate: '-15deg' }] }]} />
        <View style={[styles.road, { top: '60%', width: '100%', height: 15 }]} />
        
        {/* Dekorasi: Sungai/Danau Kecil */}
        <View style={styles.lake} />

        {/* User Location Marker (Pulse Effect) */}
        <View style={styles.userLocation}>
          <View style={styles.pulseRing} />
          <View style={styles.userDot} />
        </View>

        {/* 3. Render Location Pins */}
        {LOCATIONS.map((loc) => {
          const isSelected = selectedLoc.id === loc.id;
          return (
            <TouchableOpacity
              key={loc.id}
              style={[styles.pinContainer, { top: loc.top, left: loc.left }]}
              onPress={() => setSelectedLoc(loc)}
              activeOpacity={0.8}
            >
              {/* Pin Icon */}
              <View style={[styles.pinShadow, isSelected && { backgroundColor: PALETTE.accent }]} />
              <MapPin
                size={isSelected ? 48 : 36} // Membesar kalau dipilih
                color={isSelected ? PALETTE.accent : PALETTE.secondary}
                weight={isSelected ? "fill" : "duotone"}
                style={{ marginBottom: isSelected ? 10 : 0 }} // Efek melompat dikit
              />
              {/* Label Kecil di Peta */}
              {isSelected && (
                <View style={styles.pinLabel}>
                  <Text style={styles.pinLabelText}>{loc.name}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 4. Floating Detail Card (Bottom Sheet style) */}
      <View style={styles.cardContainer}>
        <LinearGradient
          colors={[PALETTE.white, '#F8FDFF']}
          style={styles.locationCard}
        >
          {/* Handle Bar (Visual cue that it's a sheet) */}
          <View style={styles.dragHandle} />

          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.locName}>{selectedLoc.name}</Text>
              <Text style={styles.locAddress}>{selectedLoc.address}</Text>
            </View>
            <TouchableOpacity style={styles.recenterBtn}>
              <Crosshair size={24} color={PALETTE.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.infoRow}>
            <Clock size={18} color="#888" weight="bold" />
            <Text style={styles.infoText}>{selectedLoc.open}</Text>
          </View>

          <TouchableOpacity style={styles.directionsBtn}>
            <NavigationArrow size={20} color={PALETTE.white} weight="bold" style={{ marginRight: 8 }} />
            <Text style={styles.btnText}>Get Directions</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PALETTE.mapBg },
  
  /* Header Styles */
  headerContainer: {
    position: 'absolute', top: 50, left: 20, right: 20, zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 16, borderRadius: 20,
    shadowColor: PALETTE.dark, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5,
    backdropFilter: 'blur(10px)', // Works on newer iOS
  },
  headerTitle: { fontFamily: 'Nunito-ExtraBold', fontSize: 20, color: PALETTE.dark },
  headerSub: { fontFamily: 'Nunito-SemiBold', fontSize: 12, color: '#888' },

  /* Map Visuals */
  mapArea: { flex: 1, position: 'relative', overflow: 'hidden' },
  mapBackground: { ...StyleSheet.absoluteFillObject, backgroundColor: '#E1F5FE' },
  road: { position: 'absolute', backgroundColor: '#FFF', opacity: 0.6 },
  lake: { 
    position: 'absolute', top: '70%', right: -50, width: 200, height: 200, 
    backgroundColor: '#B3E5FC', borderRadius: 100, opacity: 0.8 
  },
  
  /* User Location (Radar Effect) */
  userLocation: { position: 'absolute', top: '45%', left: '45%', alignItems: 'center', justifyContent: 'center' },
  userDot: { width: 16, height: 16, backgroundColor: '#2979FF', borderRadius: 8, borderWidth: 3, borderColor: '#FFF', zIndex: 2 },
  pulseRing: { 
    position: 'absolute', width: 60, height: 60, borderRadius: 30, 
    backgroundColor: 'rgba(41, 121, 255, 0.2)', borderWidth: 1, borderColor: 'rgba(41, 121, 255, 0.3)' 
  },

  /* Pins */
  pinContainer: { position: 'absolute', alignItems: 'center', justifyContent: 'flex-end', width: 100, marginLeft: -50, marginTop: -50 }, // centering trick
  pinShadow: { 
    width: 12, height: 4, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 2, marginBottom: 2 
  },
  pinLabel: {
    position: 'absolute', top: -35,
    backgroundColor: PALETTE.white, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8,
    shadowColor: '#000', shadowOpacity: 0.1, elevation: 2
  },
  pinLabelText: { fontFamily: 'Nunito-Bold', fontSize: 10, color: PALETTE.dark },

  /* Bottom Card */
  cardContainer: {
    position: 'absolute', bottom: 100, // Di atas Tab Bar (yg tingginya 70 + margin)
    left: 20, right: 20,
  },
  locationCard: {
    borderRadius: 24, padding: 20,
    shadowColor: PALETTE.secondary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 10,
  },
  dragHandle: {
    width: 40, height: 4, backgroundColor: '#E0E0E0', borderRadius: 2, alignSelf: 'center', marginBottom: 15,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  locName: { fontFamily: 'Nunito-ExtraBold', fontSize: 18, color: PALETTE.dark, flex: 1 },
  locAddress: { fontFamily: 'Nunito-Regular', fontSize: 14, color: '#666', marginTop: 2 },
  recenterBtn: { padding: 8, backgroundColor: '#F0F5F9', borderRadius: 12 },

  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, backgroundColor: '#F5F5F5', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  infoText: { fontFamily: 'Nunito-Bold', fontSize: 12, color: '#555', marginLeft: 6 },

  directionsBtn: {
    backgroundColor: PALETTE.secondary,
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    shadowColor: PALETTE.secondary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8,
  },
  btnText: { fontFamily: 'Nunito-Bold', fontSize: 16, color: '#FFF' },
});