// screens/ShopScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, ScrollView, StatusBar } from 'react-native';
import { Gift, Bag, Ticket, Plant, Sparkle, Coffee, Drop, Coin, Storefront } from 'phosphor-react-native'; 
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // Precise calculation for 2 columns

// Enhanced Data with Categories
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

export default function ShopScreen() {
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter Logic
  const filteredProducts = activeCategory === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(item => item.category === activeCategory);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerTitle}>Rewards Shop</Text>
        <Text style={styles.headerSubtitle}>Redeem your hard-earned points!</Text>
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
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.categoryScroll}
      >
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
      
      <FlatList 
        ListHeaderComponent={renderHeader}
        data={filteredProducts} 
        renderItem={renderItem} 
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 24 }}
        contentContainerStyle={{ paddingBottom: 120, paddingTop: 60 }} // Extra padding bottom for tab bar
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
  headerTextContainer: { marginBottom: 20 },
  headerTitle: { fontFamily: 'Nunito-ExtraBold', fontSize: 28, color: '#0F2854' },
  headerSubtitle: { fontFamily: 'Nunito-SemiBold', fontSize: 15, color: '#8898AA', marginTop: 4 },

  /* Wallet Card */
  walletCard: {
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#1C4D8D', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, elevation: 10,
  },
  walletLabel: { fontFamily: 'Nunito-Bold', color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 4 },
  walletAmount: { fontFamily: 'Nunito-ExtraBold', color: '#FFF', fontSize: 32 },
  walletCurrency: { fontSize: 16, fontFamily: 'Nunito-Bold' },
  walletIconCircle: { 
    width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', 
    alignItems: 'center', justifyContent: 'center' 
  },

  /* Categories */
  categoryScroll: { paddingRight: 24, paddingBottom: 10 }, // Padding for scroll bounce
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: '#FFF',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#EFF2F7',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, elevation: 2,
  },
  categoryPillActive: {
    backgroundColor: '#0F2854',
    borderColor: '#0F2854',
  },
  categoryText: { fontFamily: 'Nunito-Bold', fontSize: 14, color: '#8898AA' },
  categoryTextActive: { color: '#FFF' },

  /* Product Card */
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 12,
    marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 4,
    borderWidth: 1,
    borderColor: '#F5F7FA',
  },
  imageContainer: {
    height: 110,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  priceTag: {
    position: 'absolute',
    top: 8, right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 12,
  },
  priceText: { fontFamily: 'Nunito-ExtraBold', fontSize: 12, color: '#0F2854' },

  cardContent: { paddingHorizontal: 4 },
  categoryLabel: { fontFamily: 'Nunito-Bold', fontSize: 10, color: '#8898AA', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.5 },
  name: { fontFamily: 'Nunito-ExtraBold', fontSize: 15, color: '#0F2854', marginBottom: 12 },
  
  redeemBtn: {
    backgroundColor: '#4988C4',
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redeemText: { fontFamily: 'Nunito-Bold', color: '#FFF', fontSize: 13 },
});