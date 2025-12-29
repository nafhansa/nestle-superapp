// screens/ShopScreen.js
import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, 
  ScrollView, StatusBar, Modal, Image, LayoutAnimation, Platform, UIManager 
} from 'react-native';
import { 
  Gift, Bag, Ticket, Plant, Sparkle, Coffee, Drop, Storefront, 
  X, Coin, CaretDown, CaretUp 
} from 'phosphor-react-native'; 
import { LinearGradient } from 'expo-linear-gradient';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; 

// --- DATA (ENGLISH) ---
const CATEGORIES = ['All', 'Eco', 'Home', 'Vouchers'];

const MOCK_PRODUCTS = [
  { id: '1', name: 'Eco Tumbler', cost: 500, category: 'Home', color: '#FFF0F0', icon: Coffee },
  { id: '2', name: 'Canvas Tote', cost: 300, category: 'Eco', color: '#F0F9FF', icon: Bag },
  { id: '3', name: 'Movie Tix', cost: 800, category: 'Vouchers', color: '#FFF8E1', icon: Ticket },
  { id: '4', name: 'Basil Seeds', cost: 200, category: 'Eco', color: '#F1F8E9', icon: Plant },
  { id: '5', name: 'Bamboo Set', cost: 450, category: 'Home', color: '#E0F2F1', icon: Plant },
  { id: '6', name: 'Metal Straw', cost: 150, category: 'Home', color: '#ECEFF1', icon: Drop },
  { id: '7', name: 'Discount 50%', cost: 1200, category: 'Vouchers', color: '#F3E5F5', icon: Gift },
  { id: '8', name: 'Recycle Bin', cost: 2500, category: 'Home', color: '#E3F2FD', icon: Storefront },
];

const GRAND_PRIZES = [
  { 
    id: 'g1', name: 'Mercedes-Benz GLE 450', 
    units: '1 Unit', image: 'https://img.freepik.com/free-photo/blue-jeep-parking-public-zone_114579-4042.jpg', 
    type: 'Grand',
    requirements: [
      'Exchange 500 Points for 1 Raffle Coupon.',
      'Minimum "Gold" Rank membership.',
      'Period: Oct 2025 - Jan 2026.'
    ]
  },
  { 
    id: 'g2', name: 'Toyota Innova Zenix', 
    units: '12 Units', image: 'https://img.freepik.com/free-photo/white-off-roader-jeep-parking_114579-4007.jpg', 
    type: 'Grand',
    requirements: [
      'Exchange 250 Points for 1 Raffle Coupon.',
      'Open for all membership ranks.',
      'Double chance for "Silver" Rank.'
    ]
  },
  { 
    id: 'g3', name: 'Gold Bar 10g', 
    units: '120 Units', image: 'https://img.freepik.com/free-photo/gold-ingots-rendering_23-2147728468.jpg', 
    type: 'Grand',
    requirements: [
      'Exchange 100 Points for 1 Raffle Coupon.',
      'Daily limit: 5 coupons per user.',
      'Drawing every month.'
    ]
  },
];

export default function ShopScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showGrandPrize, setShowGrandPrize] = useState(false); 
  const [prizeTab, setPrizeTab] = useState('Grand'); 
  
  // State for expanded card ID
  const [expandedPrizeId, setExpandedPrizeId] = useState(null);

  // Filter Logic
  const filteredProducts = activeCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(item => item.category === activeCategory);

  // Handle Expand Animation
  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expandedPrizeId === id) {
      setExpandedPrizeId(null); // Collapse if already open
    } else {
      setExpandedPrizeId(id); // Expand the clicked one
    }
  };

  // --- COMPONENT: GRAND PRIZE MODAL ---
  const renderGrandPrizeModal = () => (
    <Modal
      animationType="slide"
      transparent={false}
      visible={showGrandPrize}
      onRequestClose={() => setShowGrandPrize(false)}
    >
      <View style={{flex: 1, backgroundColor: '#0057FF'}}>
        <StatusBar barStyle="light-content" />
        
        <LinearGradient colors={['#0041C2', '#0099FF']} style={styles.gpBackground} />

        {/* Modal Header */}
        <View style={styles.gpHeader}>
          <TouchableOpacity onPress={() => setShowGrandPrize(false)} style={styles.closeBtn}>
            <X size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.gpTitle}>Grand Giveaway</Text>
          <View style={{width: 24}} /> 
        </View>

        <ScrollView contentContainerStyle={styles.gpScrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Main Banner */}
          <View style={styles.gpBannerCard}>
            <View style={styles.gpBannerTextContainer}>
                <Text style={styles.gpBannerTitle}>Win Dream Prizes!</Text>
                <Text style={styles.gpBannerSubtitle}>Period: Oct 2025 - Jan 2026</Text>
            </View>
            <Sparkle size={60} color="#FFD700" weight="fill" style={{opacity: 0.8}} />
          </View>

          {/* Point Info */}
          <View style={styles.gpPointsBar}>
             <View style={{flexDirection:'row', alignItems:'center'}}>
                <Coin size={20} color="#FFD700" weight="fill" style={{marginRight: 8}}/>
                <Text style={{color:'#FFF', fontWeight:'bold', fontSize: 16}}>2,450 Points</Text>
             </View>
             <TouchableOpacity style={styles.gpInfoBtn}>
                <Text style={{color:'#FFF', fontSize: 12}}>History</Text>
             </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.gpTabs}>
            <TouchableOpacity 
                style={[styles.gpTabBtn, prizeTab === 'Grand' && styles.gpTabActive]}
                onPress={() => setPrizeTab('Grand')}
            >
                <Text style={[styles.gpTabText, prizeTab === 'Grand' && styles.gpTabTextActive]}>Grand Prize</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.gpTabBtn, prizeTab === 'Instant' && styles.gpTabActive]}
                onPress={() => setPrizeTab('Instant')}
            >
                <Text style={[styles.gpTabText, prizeTab === 'Instant' && styles.gpTabTextActive]}>Instant Win</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.gpDesc}>
            Tap on the card to see how to win. Drawing will be held on February 2026.
          </Text>

          {/* Full Width List for Better Expansion */}
          <View style={styles.gpListContainer}>
             {GRAND_PRIZES.map((item) => {
               const isExpanded = expandedPrizeId === item.id;
               return (
                 <TouchableOpacity 
                    key={item.id} 
                    style={styles.gpCardFull} 
                    activeOpacity={0.9}
                    onPress={() => toggleExpand(item.id)}
                 >
                    {/* Image Area */}
                    <View style={styles.gpImageWrapper}>
                        <Image source={{uri: item.image}} style={styles.gpImageFull} />
                        <View style={styles.gpUnitBadgeFloat}>
                            <Text style={styles.gpUnitText}>{item.units}</Text>
                        </View>
                    </View>
                    
                    {/* Basic Info */}
                    <View style={styles.gpCardHeader}>
                        <Text style={styles.gpNameFull}>{item.name}</Text>
                        {isExpanded ? <CaretUp size={20} color="#FFF"/> : <CaretDown size={20} color="#FFF"/>}
                    </View>

                    {/* EXPANDABLE SECTION */}
                    {isExpanded && (
                        <View style={styles.expandedContent}>
                            <View style={styles.divider} />
                            <Text style={styles.reqTitle}>How to Participate:</Text>
                            {item.requirements.map((req, idx) => (
                                <View key={idx} style={styles.reqRow}>
                                    <View style={styles.bulletPoint} />
                                    <Text style={styles.reqText}>{req}</Text>
                                </View>
                            ))}
                            
                            <TouchableOpacity style={styles.exchangeBtn}>
                                <Text style={styles.exchangeBtnText}>Exchange Coupon</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                 </TouchableOpacity>
               );
             })}
          </View>

          <View style={{height: 50}} />
        </ScrollView>
      </View>
    </Modal>
  );

  // --- MAIN SCREEN RENDER ---
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerTopRow}>
        <View>
            <Text style={styles.headerTitle}>Rewards Shop</Text>
            <Text style={styles.headerSubtitle}>Redeem your hard-earned points!</Text>
        </View>

        {/* Trigger Button */}
        <TouchableOpacity 
            style={styles.grandPrizeBtn} 
            activeOpacity={0.8}
            onPress={() => setShowGrandPrize(true)}
        >
            <LinearGradient
                colors={['#FFD700', '#FFA000']} 
                style={styles.gpBtnGradient}
            >
                <Gift size={24} color="#FFF" weight="fill" />
            </LinearGradient>
            <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      {/* Wallet Card */}
      <LinearGradient
        colors={['#4988C4', '#1C4D8D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.walletCard}
      >
        <View>
          <Text style={styles.walletLabel}>Your Balance</Text>
          <Text style={styles.walletAmount}>2,450 <Text style={styles.walletCurrency}>Pts</Text></Text>
        </View>
        <View style={styles.walletIconCircle}>
           <Sparkle size={24} color="#FFD700" weight="fill" />
        </View>
      </LinearGradient>

      {/* Category Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
        {CATEGORIES.map((cat, index) => {
          const isActive = activeCategory === cat;
          return (
            <TouchableOpacity 
              key={index} 
              onPress={() => setActiveCategory(cat)}
              style={[styles.categoryPill, isActive && styles.categoryPillActive]}
            >
              <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderItem = ({ item }) => {
    const Icon = item.icon;
    return (
      <View style={styles.card}>
        <View style={[styles.imageContainer, { backgroundColor: item.color }]}>
          <Icon size={48} color="#455A64" weight="duotone" />
          <View style={styles.priceTag}>
             <Text style={styles.priceText}>{item.cost}</Text>
          </View>
        </View>
        
        <View style={styles.cardContent}>
          <Text style={styles.categoryLabel}>{item.category}</Text>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          
          <TouchableOpacity style={styles.redeemBtn}>
            <Text style={styles.redeemText}>Redeem</Text>
            <Ticket size={14} color="#FFF" weight="bold" style={{marginLeft: 4}}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={['#F8FBFF', '#FFFFFF']} style={styles.bg} />
      
      {/* Modal Injection */}
      {renderGrandPrizeModal()}

      <FlatList 
        ListHeaderComponent={renderHeader}
        data={filteredProducts} 
        renderItem={renderItem} 
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 24 }}
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 60 }} 
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bg: { position: 'absolute', width: '100%', height: '100%' },

  /* Header Section */
  headerContainer: { paddingHorizontal: 24, marginBottom: 20 },
  headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  headerTitle: { fontFamily: 'Nunito-ExtraBold', fontSize: 28, color: '#0F2854' },
  headerSubtitle: { fontFamily: 'Nunito-SemiBold', fontSize: 15, color: '#8898AA', marginTop: 4 },

  /* Trigger Button */
  grandPrizeBtn: { shadowColor: '#FFD700', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, elevation: 5 },
  gpBtnGradient: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  notifDot: { position: 'absolute', top: 0, right: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: '#FF3D00', borderWidth: 2, borderColor: '#FFF' },

  /* Wallet Card */
  walletCard: { borderRadius: 24, padding: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, shadowColor: '#1C4D8D', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, elevation: 10 },
  walletLabel: { fontFamily: 'Nunito-Bold', color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 4 },
  walletAmount: { fontFamily: 'Nunito-ExtraBold', color: '#FFF', fontSize: 32 },
  walletCurrency: { fontSize: 16, fontFamily: 'Nunito-Bold' },
  walletIconCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },

  /* Categories */
  categoryScroll: { paddingRight: 24, paddingBottom: 10 },
  categoryPill: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 30, backgroundColor: '#FFF', marginRight: 10, borderWidth: 1, borderColor: '#EFF2F7', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, elevation: 2 },
  categoryPillActive: { backgroundColor: '#0F2854', borderColor: '#0F2854' },
  categoryText: { fontFamily: 'Nunito-Bold', fontSize: 14, color: '#8898AA' },
  categoryTextActive: { color: '#FFF' },

  /* Product Card */
  card: { width: CARD_WIDTH, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 12, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 4, borderWidth: 1, borderColor: '#F5F7FA' },
  imageContainer: { height: 110, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 12, position: 'relative' },
  priceTag: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  priceText: { fontFamily: 'Nunito-ExtraBold', fontSize: 12, color: '#0F2854' },
  cardContent: { paddingHorizontal: 4 },
  categoryLabel: { fontFamily: 'Nunito-Bold', fontSize: 10, color: '#8898AA', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 },
  name: { fontFamily: 'Nunito-ExtraBold', fontSize: 15, color: '#0F2854', marginBottom: 12 },
  redeemBtn: { backgroundColor: '#4988C4', paddingVertical: 10, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  redeemText: { fontFamily: 'Nunito-Bold', color: '#FFF', fontSize: 13 },

  /* --- GRAND PRIZE MODAL STYLES --- */
  gpBackground: { position: 'absolute', width: '100%', height: '100%' },
  gpHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 20 },
  gpTitle: { fontSize: 20, color: '#FFF', fontFamily: 'Nunito-ExtraBold' },
  closeBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20 },
  
  gpScrollContent: { paddingHorizontal: 20 },
  gpBannerCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  gpBannerTitle: { fontSize: 22, color: '#FFD700', fontFamily: 'Nunito-ExtraBold', marginBottom: 4 },
  gpBannerSubtitle: { fontSize: 12, color: '#FFF' },

  gpPointsBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)', padding: 12, borderRadius: 12, marginBottom: 20 },
  gpInfoBtn: { borderWidth: 1, borderColor: '#FFF', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },

  gpTabs: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 12, padding: 4, marginBottom: 20 },
  gpTabBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  gpTabActive: { backgroundColor: '#0057FF' },
  gpTabText: { fontWeight: 'bold', color: '#0057FF' },
  gpTabTextActive: { color: '#FFF' },

  gpDesc: { color: '#E0E0E0', fontSize: 13, textAlign: 'center', marginBottom: 24, lineHeight: 20 },

  /* --- FULL WIDTH CARDS WITH EXPAND --- */
  gpListContainer: { flexDirection: 'column' },
  gpCardFull: { width: '100%', backgroundColor: '#0070FF', borderRadius: 20, marginBottom: 16, overflow: 'hidden', elevation: 5, shadowColor: '#000', shadowOffset:{width:0, height:4}, shadowOpacity: 0.3, paddingBottom: 16 },
  
  gpImageWrapper: { position: 'relative', width: '100%', height: 180 },
  gpImageFull: { width: '100%', height: '100%', resizeMode: 'cover' },
  gpUnitBadgeFloat: { position: 'absolute', bottom: 12, left: 12, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  gpUnitText: { color: '#FFD700', fontSize: 12, fontWeight: 'bold' },

  gpCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 16 },
  gpNameFull: { color: '#FFF', fontWeight: 'bold', fontSize: 18, flex: 1, marginRight: 10 },

  /* Expanded Section */
  expandedContent: { marginTop: 12, paddingHorizontal: 16 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: 12 },
  reqTitle: { color: '#80BFFF', fontSize: 12, fontWeight: 'bold', marginBottom: 8, textTransform: 'uppercase' },
  reqRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 },
  bulletPoint: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#FFD700', marginTop: 6, marginRight: 10 },
  reqText: { color: '#E0F2FE', fontSize: 14, flex: 1, lineHeight: 20 },
  
  exchangeBtn: { backgroundColor: '#FFD700', marginTop: 16, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  exchangeBtnText: { color: '#0F2854', fontWeight: 'bold', fontSize: 14 }
});