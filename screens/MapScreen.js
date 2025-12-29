// screens/MapScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, Dimensions, 
  TextInput, ScrollView, Animated, Image, Easing 
} from 'react-native';
import { 
  MagnifyingGlass, Storefront, ArrowLeft, Info, 
  MapTrifold, NavigationArrow, Recycle, Leaf, BatteryCharging,
  X, Phone, ShareNetwork, BookmarkSimple, Star
} from 'phosphor-react-native';

const { width, height } = Dimensions.get('window');

// --- THEME & DATA ---
const MAP_THEME = {
  land: '#F0F3F7',
  road: '#FFFFFF',
  park: '#C5E8C5',
  water: '#AADAFF',
  building: '#E1E4E8',
  text: '#3C4043',
};

const PALETTE = {
  primary: '#1A73E8', // Google Blue
  secondary: '#1C4D8D',
  green: '#188038',
  red: '#D93025',
  bgGray: '#F8F9FA',
};

const DROP_POINTS = [
  { 
    id: '1', 
    name: 'Waste Station Nestlé: Alfamart M. Kahfi', 
    rating: 4.8, reviews: 124,
    category: 'Waste Management Service',
    address: 'Alfamart M. Kahfi No. 2, Jagakarsa', 
    status: 'Buka', closeTime: '18:00',
    distance: '2.1 km', time: '15 min',
    top: '42%', left: '48%', isOpen: true,
    images: ['https://via.placeholder.com/150/99ccff/333', 'https://via.placeholder.com/150/ccccff/333', 'https://via.placeholder.com/150/ccffcc/333']
  },
  { 
    id: '2', 
    name: 'Waste Station AQUA TMII', 
    rating: 4.5, reviews: 89,
    category: 'Recycling Center',
    address: 'Taman Mini Indonesia Indah', 
    status: 'Tutup', closeTime: '-',
    distance: '35.2 km', time: '45 min',
    top: '55%', left: '75%', isOpen: false,
    images: ['https://via.placeholder.com/150/ffcccc/333', 'https://via.placeholder.com/150/ffffcc/333']
  },
  { 
    id: '3', 
    name: 'Waste Station DHL Halim', 
    rating: 4.2, reviews: 45,
    category: 'Drop Off Point',
    address: 'Graha Intirub, Jl. Cililitan', 
    status: 'Tutup', closeTime: '-',
    distance: '3.8 km', time: '20 min',
    top: '65%', left: '20%', isOpen: false,
    images: ['https://via.placeholder.com/150/e0e0e0/333']
  },
  { 
    id: '4', 
    name: 'Waste Station: Indomaret Raya', 
    rating: 4.9, reviews: 210,
    category: 'Recycling Point',
    address: 'Jl. Raya Bogor KM 24', 
    status: 'Buka', closeTime: '20:00',
    distance: '2.5 km', time: '12 min',
    top: '28%', left: '65%', isOpen: true,
    images: ['https://via.placeholder.com/150/c0c0c0/333', 'https://via.placeholder.com/150/a0a0a0/333']
  },
];

const CATEGORIES = [
  { id: 1, label: 'Plastik', icon: Recycle },
  { id: 2, label: 'Elektronik', icon: BatteryCharging },
  { id: 3, label: 'Organik', icon: Leaf },
  { id: 4, label: 'Kaca', icon: Storefront },
];

export default function MapScreen() {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null); // Object or Null
  
  // Animation Value untuk Bottom Sheet (Height translation)
  const slideAnim = useRef(new Animated.Value(height)).current; 

  // --- ANIMATION HANDLERS ---
  const openBottomSheet = (point) => {
    setSelectedPoint(point);
    // Slide Up (ke posisi 0 atau posisi tertentu dari bawah)
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      friction: 8,
      tension: 40
    }).start();
  };

  const closeBottomSheet = () => {
    // Slide Down (ke luar layar)
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true
    }).start(() => {
        setSelectedPoint(null);
    });
  };

  // --- RENDER MAP SCREEN ---
  const renderMapScreen = () => {
    return (
      <View style={styles.container}>
        
        {/* 1. LAYER PETA VISUAL (Google Maps Style) */}
        <View style={styles.mapContainer} onStartShouldSetResponder={() => true} onResponderRelease={closeBottomSheet}>
            {/* Background Blocks */}
            <View style={[styles.mapBlock, { top: -20, left: -20, width: '45%', height: '35%' }]} />
            <View style={[styles.buildingRect, { top: '5%', left: '5%', width: 40, height: 40 }]} />
            <View style={[styles.mapBlock, { top: -20, right: -10, width: '50%', height: '40%', backgroundColor: MAP_THEME.park }]}>
               <View style={{position:'absolute', bottom: 20, left: 10, width: 60, height: 40, borderRadius: 20, backgroundColor: MAP_THEME.water}} />
            </View>
            <View style={[styles.mapBlock, { top: '38%', left: -30, width: '60%', height: '20%' }]}>
               <View style={[styles.buildingRect, { top: 10, right: 20, width: 80, height: 20 }]} />
            </View>
            <View style={[styles.mapBlock, { top: '43%', right: -20, width: '35%', height: '25%' }]}>
               <View style={[styles.buildingRect, { top: 15, left: 15, width: 60, height: 60, backgroundColor: '#D1D5DB' }]} />
            </View>
            <View style={[styles.mapBlock, { bottom: -50, left: '10%', width: '80%', height: '30%' }]} />

            {/* Nama Jalan */}
            <Text style={{position:'absolute', top: '35%', left: '10%', fontSize: 10, color: '#9AA0A6', transform:[{rotate:'-15deg'}]}}>Jl. Raya Bogor</Text>
            <Text style={{position:'absolute', top: '40%', right: '10%', fontSize: 10, color: '#9AA0A6', transform:[{rotate:'90deg'}]}}>Jl. Tol Jagorawi</Text>

            {/* PINS */}
            {DROP_POINTS.map((loc, index) => {
              const isSelected = selectedPoint?.id === loc.id;
              return (
                <TouchableOpacity
                  key={loc.id}
                  style={[styles.pinWrapper, { top: loc.top, left: loc.left }]}
                  onPress={() => openBottomSheet(loc)} // Trigger Slide Up
                  activeOpacity={0.8}
                >
                  <View style={styles.pinShadow} />
                  <View style={[styles.pinBody, isSelected && styles.activePinBody]}>
                    <Storefront size={18} color={isSelected ? '#FFF' : PALETTE.secondary} weight="fill" />
                  </View>
                  <View style={[styles.pinPoint, isSelected && { borderTopColor: PALETTE.secondary }]} />
                </TouchableOpacity>
              );
            })}
        </View>

        {/* 2. TOP UI: SEARCH BAR & CHIPS (Akan hilang/fade saat sheet muncul, optional, tapi disini kita biarkan tetap ada) */}
        <View style={styles.topUiContainer}>
          <TouchableOpacity 
            style={styles.floatingSearchBar} 
            activeOpacity={0.9}
            onPress={() => setIsSearchMode(true)}
          >
             <MagnifyingGlass size={20} color="#5F6368" />
             <Text style={styles.searchPlaceholder}>Cari lokasi drop point...</Text>
             <View style={styles.miniAvatar}>
               <Text style={{fontSize: 10, color:'#FFF', fontWeight:'bold'}}>E</Text>
             </View>
          </TouchableOpacity>

          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity key={cat.id} style={styles.chipPill}>
                   <cat.icon size={14} color={MAP_THEME.text} weight="fill" style={{marginRight: 6}} />
                   <Text style={styles.chipText}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* 3. SLIDE-IN BOTTOM SHEET (REPLACEMENT FOR CAROUSEL) */}
        {/* Menggunakan Absolute position dan Animated transform translateY */}
        <Animated.View 
            style={[
                styles.bottomSheet, 
                { transform: [{ translateY: slideAnim }] }
            ]}
        >
            {selectedPoint && (
                <View style={styles.sheetContent}>
                    {/* Drag Handle */}
                    <View style={styles.dragHandle} />

                    {/* Header: Title & Icons */}
                    <View style={styles.sheetHeaderRow}>
                        <View style={{flex: 1, paddingRight: 10}}>
                            <Text style={styles.sheetTitle}>{selectedPoint.name}</Text>
                        </View>
                        <View style={styles.sheetIconsRight}>
                             {/* Close Button */}
                             <TouchableOpacity onPress={closeBottomSheet} style={styles.iconCircleBtn}>
                                <X size={20} color="#3C4043" />
                             </TouchableOpacity>
                        </View>
                    </View>

                    {/* Status & Info */}
                    <View style={styles.infoRow}>
                        <Text style={{color: selectedPoint.isOpen ? '#188038' : '#D93025', fontWeight: 'bold'}}>
                            {selectedPoint.status}
                        </Text>
                        <Text style={styles.infoText}> • Tutup jam {selectedPoint.closeTime}</Text>
                    </View>
                    
                    {/* Action Buttons Row */}
                    <View style={styles.actionBtnRow}>
                        {/* Tombol Directions (Primary) */}
                        <TouchableOpacity style={styles.btnPrimary}>
                            <NavigationArrow size={20} color="#FFF" weight="fill" style={{marginRight:6}}/>
                            <Text style={styles.btnPrimaryText}>Directions</Text>
                        </TouchableOpacity>

                        {/* Tombol Start (Secondary) */}
                        <TouchableOpacity style={styles.btnSecondary}>
                            <Text style={styles.btnSecondaryText}>Start</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.btnOutline}>
                            <ShareNetwork size={20} color="#1A73E8" weight="regular"/>
                        </TouchableOpacity>
                    </View>

                    {/* Image Gallery (Horizontal) */}
                    <View style={{marginTop: 16}}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {selectedPoint.images.map((img, idx) => (
                                <View key={idx} style={styles.imageCard}>
                                   {/* Placeholder style since we use dummy URLs */}
                                   <Image 
                                        source={{uri: img}} 
                                        style={styles.galleryImg} 
                                   />
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={{height: 100}} /* Spacer for bottom tab bar */ /> 
                </View>
            )}
        </Animated.View>

      </View>
    );
  };

  // --- RENDER SEARCH MODE (Tetap sama) ---
  const renderSearchScreen = () => {
    return (
      <View style={styles.containerSearch}>
        {/* Header Search Mode */}
        <View style={styles.searchHeader}>
          <TouchableOpacity onPress={() => setIsSearchMode(false)} style={{padding: 8, marginLeft: -8}}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Drop Box Point</Text>
          <View style={{width: 24}} /> 
        </View>
        
        {/* Step Indicator */}
        <View style={styles.stepContainer}>
            <View>
                <Text style={styles.stepTitle}>Pilih Lokasi Drop Box</Text>
            </View>
        </View>

        {/* Input & List (Sama seperti sebelumnya) */}
        <View style={styles.searchInputContainer}>
            <MagnifyingGlass size={20} color="#000" style={{marginRight: 10}} />
            <TextInput placeholder="Cari lokasi drop point" placeholderTextColor="#999" style={styles.searchInput} autoFocus={true}/>
        </View>

        <View style={styles.resultHeader}>
            <Text style={styles.resultCount}>5 lokasi terdekat darimu</Text>
            <TouchableOpacity style={styles.mapToggleBtn} onPress={() => setIsSearchMode(false)}>
                <MapTrifold size={16} color="#000" weight="bold" style={{marginRight: 6}}/>
                <Text style={styles.mapToggleText}>Pilih via Peta</Text>
            </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.listScrollContent} showsVerticalScrollIndicator={false}>
            {DROP_POINTS.map((item) => (
                <View key={item.id} style={styles.resultCard}>
                    <View style={styles.cardRowHeader}>
                        <View style={styles.collabTag}><Text style={styles.collabText}>{item.category}</Text></View>
                        <View style={[styles.statusBadge, { backgroundColor: item.isOpen ? '#0057FF' : '#D32F2F' }]}>
                            <Text style={styles.statusTextWhite}>{item.status}</Text>
                        </View>
                    </View>
                    <Text style={styles.resultName}>{item.name}</Text>
                    <Text style={styles.resultAddress}>{item.address}</Text>
                    <View style={styles.cardFooterSearch}>
                        <Text style={styles.distanceTextSearch}>{item.distance} dari lokasimu</Text>
                        <Info size={20} color="#000" />
                    </View>
                </View>
            ))}
            <View style={{height: 100}} />
        </ScrollView>
      </View>
    );
  };

  return isSearchMode ? renderSearchScreen() : renderMapScreen();
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  mapContainer: { flex: 1, backgroundColor: MAP_THEME.road, position: 'relative' },
  
  // Map Visuals
  mapBlock: { position: 'absolute', backgroundColor: MAP_THEME.land, borderRadius: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, elevation: 1 },
  buildingRect: { position: 'absolute', backgroundColor: MAP_THEME.building, borderRadius: 2 },

  // --- TOP UI ---
  topUiContainer: { position: 'absolute', top: 50, left: 0, right: 0, zIndex: 10 },
  floatingSearchBar: { marginHorizontal: 16, backgroundColor: '#FFF', borderRadius: 30, height: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, elevation: 4, borderWidth: 1, borderColor: '#F1F3F4' },
  searchPlaceholder: { flex: 1, marginLeft: 12, color: '#5F6368', fontSize: 16, fontFamily: 'Nunito-SemiBold' },
  miniAvatar: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#1A73E8', alignItems:'center', justifyContent:'center' },
  chipsScroll: { paddingHorizontal: 16, paddingVertical: 12 },
  chipPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, elevation: 2, borderWidth: 1, borderColor: '#E8EAED' },
  chipText: { fontSize: 13, color: MAP_THEME.text, fontWeight: '600' },

  // --- PINS ---
  pinWrapper: { position: 'absolute', alignItems: 'center', justifyContent: 'center', width: 60, height: 60, marginLeft: -30, marginTop: -60 },
  pinShadow: { position: 'absolute', bottom: 12, width: 14, height: 4, backgroundColor: '#000', borderRadius: 10, opacity: 0.2 },
  pinBody: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', borderWidth: 2.5, borderColor: PALETTE.secondary, zIndex: 2 },
  activePinBody: { backgroundColor: PALETTE.secondary, borderColor: '#FFF', transform: [{ scale: 1.15 }] },
  pinPoint: { width: 0, height: 0, borderLeftWidth: 5, borderRightWidth: 5, borderTopWidth: 6, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: PALETTE.secondary, marginTop: -3, zIndex: 1 },

  // --- BOTTOM SHEET (The Google Maps Style Card) ---
  bottomSheet: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    // Agar ada di atas tab bar bawaan (jika ada), tapi biasanya di atas NavigationContainer 
    // Kita set zIndex tinggi
    zIndex: 100, 
    elevation: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 5,
    maxHeight: height * 0.6, // Maksimal 60% layar
  },
  sheetContent: {
      padding: 20,
      paddingBottom: 0,
  },
  dragHandle: {
      width: 40, height: 4, backgroundColor: '#E0E0E0', borderRadius: 2, alignSelf: 'center', marginBottom: 12
  },
  sheetHeaderRow: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'
  },
  sheetTitle: {
      fontFamily: 'Nunito-ExtraBold', fontSize: 20, color: '#202124', marginBottom: 4
  },
  sheetSubtitle: {
      fontSize: 13, color: '#5F6368', marginBottom: 8
  },
  sheetIconsRight: {
      flexDirection: 'row', alignItems: 'center'
  },
  iconCircleBtn: {
      width: 32, height: 32, borderRadius: 16, backgroundColor: '#F1F3F4',
      alignItems: 'center', justifyContent: 'center', marginLeft: 8
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  infoText: { color: '#5F6368', fontSize: 13 },
  
  // Buttons
  actionBtnRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  btnPrimary: {
      flexDirection: 'row', backgroundColor: '#1A73E8', paddingHorizontal: 20, paddingVertical: 10,
      borderRadius: 25, alignItems: 'center', marginRight: 10
  },
  btnPrimaryText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
  btnSecondary: {
      flexDirection: 'row', backgroundColor: '#E8F0FE', paddingHorizontal: 20, paddingVertical: 10,
      borderRadius: 25, alignItems: 'center', marginRight: 10
  },
  btnSecondaryText: { color: '#1A73E8', fontWeight: 'bold', fontSize: 14 },
  btnOutline: {
      width: 42, height: 42, borderRadius: 21, borderWidth: 1, borderColor: '#D1D5DB',
      alignItems: 'center', justifyContent: 'center', marginRight: 10
  },

  // Gallery
  imageCard: {
      width: 140, height: 100, borderRadius: 12, marginRight: 10, backgroundColor: '#EEE', overflow: 'hidden'
  },
  galleryImg: { width: '100%', height: '100%', resizeMode: 'cover' },

  // --- SEARCH STYLES (Sama) ---
  containerSearch: { flex: 1, backgroundColor: '#FFFFFF', paddingTop: 50 },

  

  searchHeader: { 

    flexDirection: 'row', 

    alignItems: 'center', 

    justifyContent: 'space-between', 

    paddingHorizontal: 20, 

    marginBottom: 24 

  },

  headerTitle: { 

    fontSize: 20, 

    fontFamily: 'Nunito-ExtraBold', 

    fontWeight: '800', 

    color: '#000' 

  },


  // Style untuk Step Indicator (Lingkaran & Teks)

  stepContainer: { 

    flexDirection: 'row', 

    alignItems: 'center', 

    paddingHorizontal: 20, 

    marginBottom: 24 

  },

  stepCircle: { 

    width: 48, 

    height: 48, 

    justifyContent: 'center', 

    alignItems: 'center', 

    marginRight: 14 

  },

  stepRingBg: {

    position: 'absolute',

    width: '100%',

    height: '100%',

    borderRadius: 24,

    borderWidth: 3,

    borderColor: '#F2F4F6' // Abu-abu muda full lingkaran

  },

  stepRingActive: {

    position: 'absolute',

    width: '100%',

    height: '100%',

    borderRadius: 24,

    borderWidth: 3,

    borderColor: 'transparent',

    borderTopColor: '#0057FF', // Biru bagian atas

    borderLeftColor: '#0057FF', // Biru bagian kiri (membentuk lengkungan 90-180 derajat)

    transform: [{ rotate: '-45deg' }] 

  },

  stepNumber: { 

    fontSize: 18, 

    fontWeight: '800', 

    color: '#0057FF',

    fontFamily: 'Nunito-ExtraBold'

  },

  stepTextContainer: {

    justifyContent: 'center'

  },

  stepTitle: { 

    fontSize: 17, 

    fontWeight: '700', 

    color: '#000',

    marginBottom: 2,

    fontFamily: 'Nunito-Bold'

  },

  stepSubtitle: { 

    fontSize: 14, 

    color: '#888',

    fontFamily: 'Nunito-SemiBold'

  },


  // Input Box & List

  searchInputContainer: { 

    marginHorizontal: 20, 

    flexDirection: 'row', 

    alignItems: 'center', 

    backgroundColor: '#FFFFFF', // Background putih

    borderWidth: 1, 

    borderColor: '#E0E0E0', 

    borderRadius: 12, 

    paddingHorizontal: 14, 

    height: 52, // Sedikit lebih tinggi biar lega

    marginBottom: 20 

  },

  searchInput: { flex: 1, fontSize: 16, color: '#000', fontFamily: 'Nunito-SemiBold' },

  

  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },

  resultCount: { fontSize: 14, color: '#888', fontFamily: 'Nunito-Regular' },

  mapToggleBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F4F6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },

  mapToggleText: { fontSize: 13, fontWeight: 'bold', color: '#000' },

  

  listScrollContent: { paddingHorizontal: 20 },

  resultCard: { backgroundColor: '#FFF', borderRadius: 16, borderWidth: 1, borderColor: '#E0E0E0', padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, elevation: 2 },

  cardRowHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },

  collabTag: { flexDirection: 'row', alignItems: 'center' },

  collabText: { fontSize: 12, color: '#555', fontWeight: '600' },

  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },

  statusTextWhite: { color: '#FFF', fontSize: 11, fontWeight: '700' },

  resultName: { fontSize: 16, fontWeight: '800', color: '#000', marginBottom: 4 },

  resultAddress: { fontSize: 13, color: '#666', marginBottom: 12 },

  cardFooterSearch: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  distanceTextSearch: { fontSize: 13, color: '#888' },
});