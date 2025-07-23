import React, { useState, useCallback, useEffect } from 'react';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';

// Screen Components
import HomeScreen from './components/screens/HomeScreen';
import ProductDetailScreen from './components/screens/ProductDetailScreen';
import CategoryProductsScreen from './components/screens/CategoryProductsScreen';

// Data imports
import categoriesData from './data/categories_data.json';
import productsData from './data/products_data.json';
import siteContent from './data/site_content.json';
import constructionData from './data/construction_products.json';
import constructionSafetyShirts from './data/construction_safety_shirts.json';
import safetyProducts from './data/safety_products.json';
import safetyShoes from './data/safety_products_shoes.json';

// Legacy screens (to be refactored later)
import {
  Page,
  Card,
  Layout,
  Button,
  ButtonGroup,
  TextField,
  Select,
  Grid,
  Badge,
  Banner,
  Box,
  Divider,
  Text,
  ResourceList,
  ResourceItem,
  FormLayout,
  DataTable,
  Tabs,
  InlineStack,
  BlockStack,
  Icon,
  Thumbnail,
  ActionList,
  Popover,
  Avatar,
  Toast,
  Frame
} from '@shopify/polaris';
import {
  HomeIcon,
  ProductIcon,
  NoteIcon,
  OrderIcon,
  PersonIcon,
  SearchIcon,
  MenuIcon,
  ChevronDownIcon
} from '@shopify/polaris-icons';

const VellumApp = () => {
  // Core state
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Persona state
  const [currentPersona, setCurrentPersona] = useState('shopper'); // 'shopper' or 'manager'

  // Shopping cart state
  const [cartItems, setCartItems] = useState([]);
  
  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  
  // Toast notifications
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastAction, setToastAction] = useState(null);

  // Form states
  const [quoteQuantity, setQuoteQuantity] = useState('25');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Consolidated product data
  const allProductsData = {
    safetyProducts,
    safetyShoes,
    constructionSafetyShirts,
    constructionData,
    productsData
  };

  // Persona helpers
  const togglePersona = useCallback(() => {
    setCurrentPersona(prev => prev === 'shopper' ? 'manager' : 'shopper');
  }, []);

  // Toast helpers
  const showToast = useCallback((message, action = null) => {
    setToastMessage(message);
    setToastAction(action);
    setToastActive(true);
  }, []);

  const dismissToast = useCallback(() => {
    setToastActive(false);
    setToastAction(null);
  }, []);

  // Shopping cart helpers
  const addToCart = useCallback((product, quantity = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    setCartItems(prev => {
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    // Show toast notification
    const productName = product.title || product.name;
    const isUpdating = existingItem ? true : false;
    const message = isUpdating 
      ? `Updated ${productName} quantity in cart`
      : `Added ${productName} to cart`;
    
    showToast(message, {
      content: 'View Cart',
      onAction: () => {
        setCurrentScreen('quotes');
        dismissToast();
      }
    });
  }, [cartItems, showToast, dismissToast]);

  const updateCartQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== productId));
    } else {
      setCartItems(prev => 
        prev.map(item => 
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const removeFromCart = useCallback((productId) => {
    const item = cartItems.find(item => item.id === productId);
    setCartItems(prev => prev.filter(item => item.id !== productId));
    
    if (item) {
      const productName = item.title || item.name;
      showToast(`Removed ${productName} from cart`);
    }
  }, [cartItems, showToast]);

  // Navigation helpers
  const handleNavigate = useCallback((screen, options = {}) => {
    setCurrentScreen(screen);
    if (options.categoryId) {
      setSelectedCategoryId(options.categoryId);
    }
  }, []);

  const handleProductClick = useCallback((productId) => {
    setSelectedProductId(productId);
    setCurrentScreen('product-detail');
  }, []);

  // Keyboard shortcut for persona switching
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
        event.preventDefault();
        togglePersona();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePersona]);

  // Legacy data setup
  const { categories } = categoriesData;
  const { products } = productsData;
  const selectedProduct = products.find(p => p.id === selectedProductId);

  // Header navigation component with persona awareness
  const HeaderComponent = () => (
    <div style={{
      background: 'white',
      borderBottom: '1px solid #e1e1e1',
      padding: '12px 24px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div 
            onClick={() => setCurrentScreen('home')} 
            style={{ cursor: 'pointer' }}
          >
            <Text variant="headingLg" as="h1">{siteContent.brandName}</Text>
          </div>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <Button variant="tertiary" onClick={() => setCurrentScreen('home')} icon={HomeIcon}>
              Home
            </Button>
            <Button variant="tertiary" onClick={() => setCurrentScreen('products')} icon={ProductIcon}>
              Products  
            </Button>
            <Button variant="tertiary" onClick={() => setCurrentScreen('quotes')} icon={NoteIcon}>
              Quotes
            </Button>
            <Button variant="tertiary" onClick={() => setCurrentScreen('orders')} icon={OrderIcon}>
              Orders
            </Button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Persona Indicator */}
          <Badge 
            tone={currentPersona === 'shopper' ? 'info' : 'success'}
            size="medium"
          >
            {currentPersona === 'shopper' ? '🛒 Shopper' : '💼 Manager'}
          </Badge>
          
          {/* Cart Items Count */}
          {cartItems.length > 0 && (
            <Button 
              variant="tertiary" 
              onClick={() => setCurrentScreen('quotes')}
              style={{
                animation: cartItems.length > 0 ? 'cartPulse 0.3s ease-in-out' : 'none'
              }}
            >
              🛒 Cart ({cartItems.length})
            </Button>
          )}

          <div style={{ position: 'relative' }}>
            <Popover
              active={userMenuOpen}
              activator={
                <Button
                  variant="tertiary"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  icon={PersonIcon}
                >
                  Account
                </Button>
              }
              onClose={() => setUserMenuOpen(false)}
            >
              <ActionList
                items={[
                  {content: `Switch to ${currentPersona === 'shopper' ? 'Manager' : 'Shopper'} (Ctrl+P)`, onAction: () => {togglePersona(); setUserMenuOpen(false);}},
                  {content: 'Business Application', onAction: () => {setCurrentScreen('business-app'); setUserMenuOpen(false);}},
                  {content: 'Account Settings', onAction: () => console.log('Account settings')},
                  {content: 'Support', onAction: () => console.log('Support')},
                ]}
              />
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );

  // Legacy screen components (keeping for now to avoid breaking)
  const ProductsScreen = () => (
    <Page title="All Products" subtitle="Browse our complete catalog">
      <Layout>
        <Layout.Section>
          <Card>
            <Box padding="400">
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">Product Categories</Text>
                <Grid>
                  {categories.map((category, index) => (
                    <Grid.Cell key={index} columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
                      <Card>
                        <Box padding="400">
                          <BlockStack gap="300" inlineAlign="center">
                            <div style={{fontSize: '48px'}}>{category.icon}</div>
                            <Text variant="headingMd" as="h3">{category.name}</Text>
                            <Text>{category.description}</Text>
                            <Button onClick={() => {
                              if (category.id === 'construction-safety-shirts' || category.id === 'safety-footwear' || category.id === 'safety-equipment') {
                                setSelectedCategoryId(category.id);
                                setCurrentScreen('category-products');
                              } else {
                                setCurrentScreen('products');
                              }
                            }}>Browse</Button>
                          </BlockStack>
                        </Box>
                      </Card>
                    </Grid.Cell>
                  ))}
                </Grid>
              </BlockStack>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );

  // Simple placeholder screens
  const QuoteBuilderScreen = () => (
    <Page title="Request Quote" backAction={{content: 'Products', onAction: () => setCurrentScreen('products')}}>
      <Card><Box padding="400"><Text>Quote Builder - Coming Soon</Text></Box></Card>
    </Page>
  );

  const BusinessApplicationScreen = () => (
    <Page title="Business Application" backAction={{content: 'Home', onAction: () => setCurrentScreen('home')}}>
      <Card><Box padding="400"><Text>Business Application - Coming Soon</Text></Box></Card>
    </Page>
  );

  const QuotesScreen = () => {
    const [selectedItems, setSelectedItems] = useState([]);
    
    const cartSubtotal = cartItems.reduce((sum, item) => {
      const price = item.price_numeric || item.price || 0;
      return sum + (price * item.quantity);
    }, 0);
    
    const contractorDiscount = cartSubtotal * 0.15; // 15% contractor discount
    const deliveryFee = cartSubtotal > 500 ? 0 : 75; // Free shipping over $500
    const taxRate = 0.0825; // 8.25% tax
    const taxAmount = (cartSubtotal - contractorDiscount + deliveryFee) * taxRate;
    const cartTotal = cartSubtotal - contractorDiscount + deliveryFee + taxAmount;

    const handleSelectAll = () => {
      if (selectedItems.length === cartItems.length) {
        setSelectedItems([]);
      } else {
        setSelectedItems(cartItems.map(item => item.id));
      }
    };

    const handleBulkRemove = () => {
      selectedItems.forEach(itemId => removeFromCart(itemId));
      setSelectedItems([]);
    };

    return (
      <Page 
        title={currentPersona === 'shopper' ? 'Shopping Cart' : 'Quote Review'}
        subtitle={`${cartItems.length} items • $${cartTotal.toFixed(2)} total`}
        primaryAction={
          currentPersona === 'shopper' 
            ? {content: 'Submit for Approval', onAction: () => console.log('Submit quote')}
            : {content: 'Approve Quote', onAction: () => console.log('Approve quote')}
        }
        secondaryActions={
          currentPersona === 'manager' 
            ? [{content: 'Request Changes', onAction: () => console.log('Request changes')}]
            : [{content: 'Save Cart', onAction: () => console.log('Save cart')}]
        }
      >
        <Layout>
          <Layout.Section>
            <Card>
              {cartItems.length === 0 ? (
                <Box padding="400">
                  <BlockStack gap="400" inlineAlign="center">
                    <Text variant="headingMd" as="h2">No items in cart</Text>
                    <Text>Add products to your cart to create a quote</Text>
                    <Button onClick={() => setCurrentScreen('home')}>
                      Continue Shopping
                    </Button>
                  </BlockStack>
                </Box>
              ) : (
                <>
                  {/* Cart Header with Bulk Actions */}
                  <Box padding="400" borderBlockEndWidth="025" borderColor="border">
                    <BlockStack gap="300">
                      <InlineStack align="space-between">
                        <Text variant="headingLg" as="h2">
                          {currentPersona === 'shopper' ? 'Cart Items' : 'Quote Items for Review'} ({cartItems.length})
                        </Text>
                        {currentPersona === 'shopper' && (
                          <InlineStack gap="200">
                            <Button 
                              variant="secondary" 
                              size="slim"
                              onClick={handleSelectAll}
                            >
                              {selectedItems.length === cartItems.length ? 'Deselect All' : 'Select All'}
                            </Button>
                            {selectedItems.length > 0 && (
                              <Button 
                                variant="primary" 
                                tone="critical"
                                size="slim"
                                onClick={handleBulkRemove}
                              >
                                Remove Selected ({selectedItems.length})
                              </Button>
                            )}
                          </InlineStack>
                        )}
                      </InlineStack>
                    </BlockStack>
                  </Box>

                  {/* Cart Items */}
                  <Box padding="0">
                    {cartItems.map((item, index) => {
                      const itemPrice = item.price_numeric || item.price || 0;
                      const itemTotal = itemPrice * item.quantity;
                      const hasVolumeDiscount = item.quantity >= 10; // Simple volume pricing logic
                      
                      return (
                        <Box 
                          key={item.id || index}
                          padding="400"
                          borderBlockEndWidth={index < cartItems.length - 1 ? "025" : "0"}
                          borderColor="border"
                        >
                          <Grid>
                            <Grid.Cell columnSpan={{xs: 1, sm: 1, md: 1, lg: 1, xl: 1}}>
                              {currentPersona === 'shopper' && (
                                <input 
                                  type="checkbox"
                                  checked={selectedItems.includes(item.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedItems([...selectedItems, item.id]);
                                    } else {
                                      setSelectedItems(selectedItems.filter(id => id !== item.id));
                                    }
                                  }}
                                  style={{ marginTop: '8px' }}
                                />
                              )}
                            </Grid.Cell>
                            
                            <Grid.Cell columnSpan={{xs: 2, sm: 2, md: 2, lg: 2, xl: 2}}>
                              {/* Product Image */}
                              <div style={{ width: '80px', height: '80px' }}>
                                {item.images && item.images[0] ? (
                                  <img 
                                    src={`/src/assets/${item.images[0].local_path}`}
                                    alt={item.title || item.name}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover',
                                      borderRadius: '4px'
                                    }}
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      e.target.parentNode.innerHTML = `
                                        <div style="
                                          width: 80px; 
                                          height: 80px; 
                                          background: #f0f0f0;
                                          display: flex;
                                          align-items: center;
                                          justify-content: center;
                                          font-size: 24px;
                                          border-radius: 4px;
                                        ">${item.icon || '📦'}</div>
                                      `;
                                    }}
                                  />
                                ) : (
                                  <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: '#f0f0f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px',
                                    borderRadius: '4px'
                                  }}>
                                    {item.icon || '📦'}
                                  </div>
                                )}
                              </div>
                            </Grid.Cell>
                            
                            <Grid.Cell columnSpan={{xs: 4, sm: 4, md: 4, lg: 4, xl: 4}}>
                              {/* Product Details */}
                              <BlockStack gap="200">
                                <Text variant="headingMd">{item.title || item.name}</Text>
                                <Text tone="subdued" variant="bodySm">
                                  SKU: {item.sku} {item.vendor && `| ${item.vendor}`}
                                </Text>
                                {item.product_type && (
                                  <Text tone="subdued" variant="bodySm">{item.product_type}</Text>
                                )}
                                {hasVolumeDiscount && (
                                  <Badge tone="success" size="small">Volume Discount Applied</Badge>
                                )}
                              </BlockStack>
                            </Grid.Cell>
                            
                            <Grid.Cell columnSpan={{xs: 2, sm: 2, md: 2, lg: 2, xl: 2}}>
                              {/* Quantity Controls */}
                              <BlockStack gap="200" inlineAlign="center">
                                <Text variant="bodySm" tone="subdued">Quantity</Text>
                                {currentPersona === 'shopper' ? (
                                  <InlineStack gap="100" align="center">
                                    <Button 
                                      size="slim" 
                                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                      disabled={item.quantity <= 1}
                                    >
                                      -
                                    </Button>
                                    <Text variant="bodyMd" alignment="center" style={{ minWidth: '30px' }}>
                                      {item.quantity}
                                    </Text>
                                    <Button 
                                      size="slim" 
                                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                    >
                                      +
                                    </Button>
                                  </InlineStack>
                                ) : (
                                  <Text variant="bodyMd">{item.quantity}</Text>
                                )}
                              </BlockStack>
                            </Grid.Cell>
                            
                            <Grid.Cell columnSpan={{xs: 2, sm: 2, md: 2, lg: 2, xl: 2}}>
                              {/* Pricing */}
                              <BlockStack gap="100" inlineAlign="end">
                                <Text variant="bodySm" tone="subdued">Unit Price</Text>
                                <Text variant="bodyMd">${itemPrice.toFixed(2)}</Text>
                                <Text variant="headingMd" tone="success">${itemTotal.toFixed(2)}</Text>
                                {currentPersona === 'shopper' && (
                                  <Button 
                                    variant="tertiary" 
                                    tone="critical"
                                    size="slim"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    Remove
                                  </Button>
                                )}
                              </BlockStack>
                            </Grid.Cell>
                          </Grid>
                        </Box>
                      );
                    })}
                  </Box>

                  {/* Cart Summary */}
                  <Box padding="400" background="bg-surface-secondary">
                    <Grid>
                      <Grid.Cell columnSpan={{xs: 8, sm: 8, md: 8, lg: 8, xl: 8}}>
                        {/* Continue Shopping */}
                        <Button variant="secondary" onClick={() => setCurrentScreen('home')}>
                          Continue Shopping
                        </Button>
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{xs: 4, sm: 4, md: 4, lg: 4, xl: 4}}>
                        {/* Price Breakdown */}
                        <BlockStack gap="200">
                          <InlineStack align="space-between">
                            <Text>Subtotal ({cartItems.length} items):</Text>
                            <Text>${cartSubtotal.toFixed(2)}</Text>
                          </InlineStack>
                          <InlineStack align="space-between">
                            <Text tone="success">Contractor Discount (15%):</Text>
                            <Text tone="success">-${contractorDiscount.toFixed(2)}</Text>
                          </InlineStack>
                          <InlineStack align="space-between">
                            <Text>Delivery Fee:</Text>
                            <Text>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</Text>
                          </InlineStack>
                          <InlineStack align="space-between">
                            <Text>Tax (8.25%):</Text>
                            <Text>${taxAmount.toFixed(2)}</Text>
                          </InlineStack>
                          <Divider />
                          <InlineStack align="space-between">
                            <Text variant="headingMd">Total:</Text>
                            <Text variant="headingMd" tone="success">${cartTotal.toFixed(2)}</Text>
                          </InlineStack>
                          {deliveryFee > 0 && (
                            <Text variant="bodySm" tone="subdued">
                              Add ${(500 - cartSubtotal).toFixed(2)} more for free shipping
                            </Text>
                          )}
                        </BlockStack>
                      </Grid.Cell>
                    </Grid>
                  </Box>
                </>
              )}
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  };

  const OrdersScreen = () => (
    <Page title="Orders">
      <Card><Box padding="400"><Text>Orders Management - Coming Soon</Text></Box></Card>
    </Page>
  );

  // Screen router
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            onNavigate={handleNavigate}
            onProductClick={handleProductClick}
            categoriesData={categoriesData}
            safetyProducts={safetyProducts}
            safetyShoes={safetyShoes}
            constructionSafetyShirts={constructionSafetyShirts}
            currentPersona={currentPersona}
            addToCart={addToCart}
          />
        );
      case 'products':
        return <ProductsScreen />;
      case 'category-products':
        return (
          <CategoryProductsScreen 
            selectedCategoryId={selectedCategoryId}
            onNavigate={handleNavigate}
            onProductClick={handleProductClick}
            categoriesData={categoriesData}
            allProductsData={allProductsData}
            currentPersona={currentPersona}
            addToCart={addToCart}
          />
        );
      case 'product-detail':
        return (
          <ProductDetailScreen 
            selectedProductId={selectedProductId}
            onNavigate={handleNavigate}
            allProductsData={allProductsData}
            categoriesData={categoriesData}
            currentPersona={currentPersona}
            addToCart={addToCart}
          />
        );
      case 'quote-builder':
        return <QuoteBuilderScreen />;
      case 'business-app':
        return <BusinessApplicationScreen />;
      case 'quotes':
        return <QuotesScreen />;
      case 'orders':
        return <OrdersScreen />;
      default:
        return <HomeScreen onNavigate={handleNavigate} onProductClick={handleProductClick} />;
    }
  };

  const toastMarkup = toastActive ? (
    <Toast
      content={toastMessage}
      action={toastAction}
      onDismiss={dismissToast}
      duration={4000}
    />
  ) : null;

  return (
    <AppProvider 
      i18n={{}} 
      features={{newDesignLanguage: true}}
      theme={{
        colorScheme: 'light',
        colors: {
          surface: '#ffffff',
          onSurface: '#202223',
          interactive: '#2c5aa0',
          secondary: '#f6f6f7',
          primary: '#00a047',
          critical: '#d72c0d',
          warning: '#ffc453',
          highlight: '#5bcdda',
          success: '#008060',
          decorative: '#ffd79d'
        }
      }}
    >
      <Frame>
        <div style={{ minHeight: '100vh', background: '#f6f6f7' }}>
          <HeaderComponent />
          <div style={{ padding: '24px' }}>
            {renderScreen()}
          </div>
        </div>
        {toastMarkup}
        <style jsx global>{`
          @keyframes cartPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}</style>
      </Frame>
    </AppProvider>
  );
};

export default VellumApp;