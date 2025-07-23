import React, { useState, useCallback } from 'react';
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
  Avatar
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


import categoriesData from './data/categories_data.json';
import productsData from './data/products_data.json';
import siteContent from './data/site_content.json';

const VellumApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Form states
  const [quoteQuantity, setQuoteQuantity] = useState('25');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('');

  const toggleSidebar = useCallback(() => setSidebarOpen(!sidebarOpen), [sidebarOpen]);
  const toggleUserMenu = useCallback(() => setUserMenuOpen(!userMenuOpen), [userMenuOpen]);

  const categories = categoriesData.categories;
  const products = productsData.products;
  const siteInfo = siteContent.site;

   // Get the selected product
  const selectedProduct = selectedProductId ? 
    products.find(p => p.id === selectedProductId) : 
    products[0]; // fallback to first product
    
  // Modern App Header Component
  const AppHeader = () => (
    <Box background="bg-surface" padding="400" borderBlockEndWidth="025" borderColor="border">
      <InlineStack align="space-between" blockAlign="center">
        <InlineStack gap="400" blockAlign="center">
          <Button
            variant="tertiary"
            icon={MenuIcon}
            onClick={toggleSidebar}
            accessibilityLabel="Toggle navigation"
          />
          <Text variant="headingLg" as="h1">Vellum</Text>
        </InlineStack>

        <InlineStack gap="300" blockAlign="center">
          <TextField
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search products, orders, quotes..."
            prefix={<Icon source={SearchIcon} />}
            autoComplete="off"
          />
          
          <Button onClick={() => setCurrentScreen('business-app')}>
            Business Application
          </Button>
          <Button>Create Account</Button>
          <Button variant="primary">Log In</Button>

          <Popover
            active={userMenuOpen}
            activator={
              <Button
                variant="tertiary"
                onClick={toggleUserMenu}
                icon={ChevronDownIcon}
              >
                <Avatar initials="AS" />
              </Button>
            }
            onClose={() => setUserMenuOpen(false)}
          >
            <ActionList
              items={[
                {content: 'Profile'},
                {content: 'Settings'},
                {content: 'Help center'},
                {content: 'Sign out'}
              ]}
            />
          </Popover>
        </InlineStack>
      </InlineStack>
    </Box>
  );

  // Modern Sidebar Navigation Component
  const AppSidebar = () => (
    <Box
      background="bg-surface-secondary"
      padding="400"
      borderInlineEndWidth="025"
      borderColor="border"
      minHeight="100vh"
      width={sidebarOpen ? "240px" : "0px"}
      style={{
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        position: 'fixed',
        top: '72px',
        left: 0,
        zIndex: 1000
      }}
    >
      {sidebarOpen && (
        <BlockStack gap="200">
          {[
            { icon: HomeIcon, label: 'Home', screen: 'home' },
            { icon: ProductIcon, label: 'Products', screen: 'products' },
            { icon: NoteIcon, label: 'Quotes', screen: 'quotes' },
            { icon: OrderIcon, label: 'Orders', screen: 'orders' },
            { icon: PersonIcon, label: 'Business Account', screen: 'business-app' }
          ].map((item) => (
            <Button
              key={item.screen}
              variant={currentScreen === item.screen ? 'primary' : 'tertiary'}
              icon={item.icon}
              onClick={() => {
                setCurrentScreen(item.screen);
                setSidebarOpen(false);
              }}
              fullWidth
              textAlign="start"
            >
              {item.label}
            </Button>
          ))}
        </BlockStack>
      )}
    </Box>
  );

  // Modern App Layout Wrapper
  const AppLayout = ({ children }) => (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--p-color-bg)' }}>
      <AppHeader />
      <AppSidebar />
      <div style={{ 
        marginLeft: sidebarOpen ? '240px' : '0px',
        transition: 'margin-left 0.3s ease',
        padding: '24px'
      }}>
        {children}
      </div>
    </div>
  );

  // Home Screen Component
  const HomeScreen = () => (
    <Page title="Welcome to Vellum" subtitle="Your B2B electronics marketplace with flexible payment terms">
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
                          <Button onClick={() => setCurrentScreen('products')}>Browse</Button>
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

        <Layout.Section>
          <Card>
            <Box padding="400">
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">Featured Products</Text>
                <Grid>
                 {products.slice(0, 6).map((product, index) => (
                    <Grid.Cell key={index} columnSpan={{xs: 6, sm: 4, md: 4, lg: 4, xl: 4}}>
                      <Card>
                        <Box padding="400">
                          <BlockStack gap="300">
                            <div style={{
                              textAlign: 'center', 
                              fontSize: '48px', 
                              background: `linear-gradient(135deg, ${categories.find(c => c.id === product.categoryId)?.color || '#667eea'} 0%, #764ba2 100%)`,
                              color: 'white', 
                              borderRadius: '8px', 
                              padding: '40px'
                            }}>
                              {product.icon}
                            </div>
                            <Text variant="headingMd" as="h3">{product.name}</Text>
                            <Text variant="headingMd" tone="success">${product.price}</Text>
                            <Text>{product.description}</Text>
                            <InlineStack gap="200">
                              <Button onClick={() => {
                                  setSelectedProductId(product.id);
                                  setCurrentScreen('product-detail');
                                }}>View Details
                              </Button>
                              <Button variant="primary" onClick={() => setCurrentScreen('quote-builder')}>Add to Quote</Button>
                            </InlineStack>
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

  // Products Screen Component
  const ProductsScreen = () => (
    <Page 
      title="Products" 
      subtitle="Browse our catalog of electronics and components"
      primaryAction={{content: 'Request Quote', onAction: () => setCurrentScreen('quote-builder')}}
    >
      <Grid>
        {products.slice(0, 6).map((product, index) => (
          <Grid.Cell key={index} columnSpan={{xs: 6, sm: 4, md: 4, lg: 4, xl: 4}}>
            <Card>
              <Box padding="400">
                <BlockStack gap="300">
                  <div style={{
                    textAlign: 'center', 
                    fontSize: '48px', 
                    background: `linear-gradient(135deg, ${categories.find(c => c.id === product.categoryId)?.color || '#667eea'} 0%, #764ba2 100%)`,
                    color: 'white', 
                    borderRadius: '8px', 
                    padding: '40px'
                  }}>
                    {product.icon}
                  </div>
                  <Text variant="headingMd" as="h3">{product.name}</Text>
                  <Text variant="headingMd" tone="success">${product.price}</Text>
                  <Text>{product.description}</Text>
                  <InlineStack gap="200">
                    <Button onClick={() => {
                        setSelectedProductId(product.id);
                        setCurrentScreen('product-detail');
                      }}>View Details
                    </Button>
                    <Button variant="primary" onClick={() => setCurrentScreen('quote-builder')}>Request Quote</Button>
                  </InlineStack>
                </BlockStack>
              </Box>
            </Card>
          </Grid.Cell>
        ))}
      </Grid>
    </Page>
  );

  // Product Detail Screen Component
  const ProductDetailScreen = () => {
    if (!selectedProduct) return <div>Product not found</div>;

  // Build volume pricing table from JSON data
    const volumePricingData = [
      ['Quantity', 'Unit Price', 'Savings'],
      ...selectedProduct.volumePricing.map(tier => [
        tier.maxQty ? `${tier.minQty}-${tier.maxQty}` : `${tier.minQty}+`,
        `$${tier.price.toFixed(2)}`,
        tier.savings > 0 ? `$${tier.savings.toFixed(2)}` : '-'
      ])
    ];

    return (
      <Page 
      title={selectedProduct.name}
      subtitle={`SKU: ${selectedProduct.sku} | Brand: ${selectedProduct.brand}`}
      backAction={{content: 'Products', onAction: () => setCurrentScreen('products')}}
      primaryAction={{content: 'Add to Quote', onAction: () => setCurrentScreen('quote-builder')}}
      secondaryActions={[
        {content: 'Add to Cart'},
        {content: `Buy with ShopPay - $${selectedProduct.price}`}
      ]}
    >
        <Layout>
          <Layout.Section oneHalf>
            <Card>
              <Box padding="400">
                <BlockStack gap="400">
                  {/* Product image placeholder */}
                  <div style={{
                    textAlign: 'center', 
                    fontSize: '96px', 
                    background: `linear-gradient(135deg, ${categories.find(c => c.id === selectedProduct.categoryId)?.color || '#667eea'} 0%, #764ba2 100%)`,
                    color: 'white', 
                    borderRadius: '8px', 
                    padding: '80px'
                  }}>
                    {selectedProduct.icon}
                  </div>

                  {/* Stock status */}
                <InlineStack gap="200" align="center">
                  <Badge tone={selectedProduct.inStock ? 'success' : 'critical'}>
                    {selectedProduct.inStock ? `${selectedProduct.stockQuantity} in stock` : 'Out of stock'}
                  </Badge>
                  {selectedProduct.reviews && (
                    <InlineStack gap="100">
                      <Text>★★★★★</Text>
                      <Text>({selectedProduct.reviews.count} reviews)</Text>
                    </InlineStack>
                  )}
                  {/* <InlineStack gap="200" align="center">
                    {['📷', '🔍', '📊', '⚙️'].map((icon, index) => (
                      <div key={index} style={{
                        width: '60px', 
                        height: '60px', 
                        background: '#f6f6f7', 
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        border: index === 0 ? '2px solid #00a047' : '2px solid transparent'
                      }}>
                        {icon}
                      </div>
                    ))}*/}
                  </InlineStack> 
                </BlockStack>
              </Box>
            </Card>
          </Layout.Section>

          <Layout.Section oneHalf>
            <BlockStack gap="400">
              {/* Pricing Card */}
              <Card>
                <Box padding="400">
                  <BlockStack gap="400">
                    <Text variant="headingLg" as="h2">${selectedProduct.price.toFixed(2)}</Text>
                    <Text>{selectedProduct.description}</Text>
                    
                    {/* Minimum order notice */}
                    {selectedProduct.minimumOrder > 1 && (
                      <Banner tone="info">
                        Minimum order quantity: {selectedProduct.minimumOrder} units
                      </Banner>
                    )}
                    
                    <FormLayout>
                      <TextField
                        label="Quantity"
                        type="number"
                        value="1"
                        min={selectedProduct.minimumOrder}
                      />
                      <Button variant="primary" size="large">
                        Add to Quote
                      </Button>
                    </FormLayout>
                  </BlockStack>
                </Box>
              </Card>

              {/* Volume Pricing */}
              <Card>
                <Box padding="400">
                  <BlockStack gap="400">
                    <Text variant="headingMd" as="h3">Volume Pricing</Text>
                    <DataTable
                      columnContentTypes={['text', 'text', 'text']}
                      headings={volumePricingData[0]}
                      rows={volumePricingData.slice(1)}
                    />
                  </BlockStack>
                </Box>
              </Card>
            </BlockStack>
          </Layout.Section>

          {/* Product Features */}
          {selectedProduct.features && (
            <Layout.Section>
              <Card>
                <Box padding="400">
                  <BlockStack gap="400">
                    <Text variant="headingMd" as="h3">Key Features</Text>
                    <Box paddingInlineStart="400">
                      <BlockStack gap="100">
                        {selectedProduct.features.map((feature, index) => (
                          <Text key={index}>• {feature}</Text>
                        ))}
                      </BlockStack>
                    </Box>
                  </BlockStack>
                </Box>
              </Card>
            </Layout.Section>
          )}
          {/* Specifications */}
          {selectedProduct.specifications && (
            <Layout.Section>
              <Card>
                <Box padding="400">
                  <BlockStack gap="400">
                    <Text variant="headingMd" as="h3">Specifications</Text>
                    <DataTable
                      columnContentTypes={['text', 'text']}
                      headings={['Specification', 'Value']}
                      rows={Object.entries(selectedProduct.specifications).map(([key, value]) => [key, value])}
                    />
                  </BlockStack>
                </Box>
              </Card>
            </Layout.Section>
          )}
        </Layout>
      </Page>
    );
  };

  // Quote Builder Screen Component
  const QuoteBuilderScreen = () => (
    <Page 
      title="Request Quote" 
      subtitle="Get volume pricing for your business needs"
      backAction={{content: 'Products', onAction: () => setCurrentScreen('products')}}
    >
      <Layout>
        <Layout.Section oneHalf>
          <Card>
            <Box padding="400">
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">Quote Items</Text>
                
                <Card>
                  <Box padding="400">
                    <InlineStack gap="400" blockAlign="center">
                      <div style={{
                        width: '80px', 
                        height: '80px', 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '24px'
                      }}>
                        🔌
                      </div>
                      <Box width="100%">
                        <BlockStack gap="200">
                          <Text variant="headingMd" as="h3">Power Supply Module</Text>
                          <Text tone="subdued">500W, Modular, 80+ Gold</Text>
                          <TextField
                            label="Quantity"
                            type="number"
                            value={quoteQuantity}
                            onChange={setQuoteQuantity}
                            autoComplete="off"
                          />
                        </BlockStack>
                      </Box>
                      <BlockStack gap="100" inlineAlign="end">
                        <Text variant="headingMd" tone="success">$198.39</Text>
                        <Text tone="subdued">per unit</Text>
                      </BlockStack>
                    </InlineStack>
                  </Box>
                </Card>

                <Banner tone="success">
                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text>Subtotal ({quoteQuantity} units):</Text>
                      <Text>${(parseFloat(quoteQuantity) * 198.39).toFixed(2)}</Text>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text>Volume Discount (20%):</Text>
                      <Text tone="success">-${((parseFloat(quoteQuantity) * 247.99) - (parseFloat(quoteQuantity) * 198.39)).toFixed(2)}</Text>
                    </InlineStack>
                    <Divider />
                    <InlineStack align="space-between">
                      <Text variant="headingMd">Estimated Total:</Text>
                      <Text variant="headingMd">${(parseFloat(quoteQuantity) * 198.39).toFixed(2)}</Text>
                    </InlineStack>
                  </BlockStack>
                </Banner>
              </BlockStack>
            </Box>
          </Card>
        </Layout.Section>

        <Layout.Section oneHalf>
          <Card>
            <Box padding="400">
              <BlockStack gap="400">
                <Text variant="headingMd" as="h2">Contact Information</Text>
                <FormLayout>
                  <TextField
                    label="Company Name"
                    value={companyName}
                    onChange={setCompanyName}
                    placeholder="Your Company"
                    autoComplete="organization"
                  />
                  <TextField
                    label="Contact Name"
                    value={contactName}
                    onChange={setContactName}
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                  <TextField
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="john@company.com"
                    autoComplete="email"
                  />
                  <TextField
                    label="Phone Number"
                    type="tel"
                    value={phone}
                    onChange={setPhone}
                    placeholder="(555) 123-4567"
                    autoComplete="tel"
                  />
                  <Select
                    label="Project Timeline"
                    options={[
                      {label: 'Immediate (1-2 weeks)', value: 'immediate'},
                      {label: 'Short-term (1 month)', value: 'short'},
                      {label: 'Medium-term (3 months)', value: 'medium'},
                      {label: 'Long-term (6+ months)', value: 'long'},
                    ]}
                    value=""
                  />
                  <TextField
                    label="Additional Requirements"
                    multiline={4}
                    placeholder="Special requirements, customizations, or delivery notes..."
                  />
                  <Button 
                    variant="primary" 
                    size="large" 
                    fullWidth
                    onClick={() => setCurrentScreen('quote-success')}
                  >
                    Submit Quote Request
                  </Button>
                </FormLayout>
              </BlockStack>
            </Box>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );

  // Quote Success Screen Component
  const QuoteSuccessScreen = () => (
    <Page title="">
      <BlockStack gap="400">
        <Banner
          title="✅ Quote Request Submitted"
          tone="success"
        >
          <Text>Thank you! Your quote request has been received and is being processed.</Text>
        </Banner>

        <Card>
          <Box padding="400">
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">What Happens Next?</Text>
              
              <BlockStack gap="400">
                {[
                  {step: '1', title: 'Review & Analysis', description: 'Our team will review your requirements and verify product availability.'},
                  {step: '2', title: 'Custom Pricing', description: 'We\'ll prepare competitive volume pricing based on your quantity and timeline.'},
                  {step: '3', title: 'Quote Delivery', description: 'You\'ll receive a detailed quote via email within 24 hours.'},
                  {step: '4', title: 'Follow-up', description: 'Our sales team may contact you to discuss additional options or answer questions.'}
                ].map((item, index) => (
                  <InlineStack key={index} gap="400">
                    <div style={{
                      background: '#00a047', 
                      color: 'white', 
                      borderRadius: '50%', 
                      width: '32px', 
                      height: '32px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}>
                      {item.step}
                    </div>
                    <BlockStack gap="100">
                      <Text variant="headingMd" as="h3">{item.title}</Text>
                      <Text tone="subdued">{item.description}</Text>
                    </BlockStack>
                  </InlineStack>
                ))}
              </BlockStack>

              <Banner tone="info">
                <BlockStack gap="200">
                  <Text variant="headingMd" as="h3">Expected Timeline</Text>
                  <Text><strong>Instant Approval:</strong> Some applications may be approved immediately.</Text>
                  <Text><strong>Standard Review:</strong> Most applications are processed within 1-2 business days.</Text>
                </BlockStack>
              </Banner>

              <InlineStack gap="200">
                <Button variant="primary" onClick={() => setCurrentScreen('home')}>🛍️ Continue Shopping</Button>
                <Button onClick={() => setCurrentScreen('quotes')}>📋 View My Quotes</Button>
              </InlineStack>
            </BlockStack>
          </Box>
        </Card>
      </BlockStack>
    </Page>
  );

  // Business Application Screen Component
  const BusinessApplicationScreen = () => (
    <Page title="Apply for Business Account" subtitle="Unlock volume pricing, net payment terms, and dedicated support for your business">
      <BlockStack gap="400">
        <Banner
          title="Business Benefits"
          tone="info"
        >
          <BlockStack gap="200">
            {[
              'Volume pricing discounts up to 30%',
              'Net 30/60/90 payment terms',
              'Working capital financing',
              'Dedicated account manager',
              'Priority customer support',
              'Custom pricing agreements'
            ].map((benefit, index) => (
              <InlineStack key={index} gap="200">
                <Text tone="success">✓</Text>
                <Text>{benefit}</Text>
              </InlineStack>
            ))}
          </BlockStack>
        </Banner>

        <Layout>
          <Layout.Section>
            <Card>
              <Box padding="400">
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">Business Information</Text>
                  <FormLayout>
                    <FormLayout.Group>
                      <TextField
                        label="Company Name"
                        value={companyName}
                        onChange={setCompanyName}
                        placeholder="Your Company Name"
                        autoComplete="organization"
                        requiredIndicator
                      />
                      <Select
                        label="Business Type"
                        value={businessType}
                        onChange={setBusinessType}
                        options={[
                          {label: 'Select business type', value: ''},
                          {label: 'Corporation', value: 'corp'},
                          {label: 'LLC', value: 'llc'},
                          {label: 'Partnership', value: 'partnership'},
                          {label: 'Sole Proprietorship', value: 'sole'},
                          {label: 'Non-profit', value: 'nonprofit'},
                        ]}
                        requiredIndicator
                      />
                    </FormLayout.Group>
                    
                    <FormLayout.Group>
                      <TextField
                        label="Federal Tax ID (EIN)"
                        placeholder="XX-XXXXXXX"
                        autoComplete="off"
                        requiredIndicator
                      />
                      <Select
                        label="Years in Business"
                        options={[
                          {label: 'Select years', value: ''},
                          {label: 'Less than 1 year', value: '<1'},
                          {label: '1-2 years', value: '1-2'},
                          {label: '3-5 years', value: '3-5'},
                          {label: '6-10 years', value: '6-10'},
                          {label: 'More than 10 years', value: '10+'},
                        ]}
                        requiredIndicator
                      />
                    </FormLayout.Group>

                    <FormLayout.Group>
                      <Select
                        label="Annual Revenue"
                        options={[
                          {label: 'Select revenue range', value: ''},
                          {label: 'Under $100K', value: '<100k'},
                          {label: '$100K - $500K', value: '100k-500k'},
                          {label: '$500K - $1M', value: '500k-1m'},
                          {label: '$1M - $5M', value: '1m-5m'},
                          {label: 'Over $5M', value: '5m+'},
                        ]}
                        requiredIndicator
                      />
                      <TextField
                        label="Website"
                        type="url"
                        placeholder="https://yourcompany.com"
                        autoComplete="url"
                      />
                    </FormLayout.Group>
                  </FormLayout>
                </BlockStack>
              </Box>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <Box padding="400">
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">Contact Information</Text>
                  <FormLayout>
                    <TextField
                      label="Primary Contact Name"
                      value={contactName}
                      onChange={setContactName}
                      placeholder="John Doe"
                      autoComplete="name"
                      requiredIndicator
                    />
                    <TextField
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={setEmail}
                      placeholder="john@company.com"
                      autoComplete="email"
                      requiredIndicator
                    />
                    <TextField
                      label="Phone Number"
                      type="tel"
                      value={phone}
                      onChange={setPhone}
                      placeholder="(555) 123-4567"
                      autoComplete="tel"
                      requiredIndicator
                    />
                    <Button 
                      variant="primary" 
                      size="large" 
                      fullWidth
                      onClick={() => setCurrentScreen('application-submitted')}
                    >
                      Submit Application
                    </Button>
                  </FormLayout>
                </BlockStack>
              </Box>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );

  // Application Submitted Screen Component
  const ApplicationSubmittedScreen = () => (
    <Page title="">
      <BlockStack gap="400">
        <Banner
          title="🎉 Application Submitted!"
          tone="success"
        >
          <Text>Thank you for applying for a business account. We'll review your application and get back to you soon.</Text>
        </Banner>

        <Card>
          <Box padding="400">
            <BlockStack gap="400">
              <Text variant="headingMd" as="h2">Application Status</Text>
              
              <InlineStack gap="200" blockAlign="center">
                <Badge tone="attention">📋 Under Review</Badge>
                <Text>Application #VEL-2025-001</Text>
              </InlineStack>

              <BlockStack gap="400">
                {[
                  {icon: '✓', title: 'Application Received', description: 'Your business application has been successfully submitted.', status: 'complete'},
                  {icon: '2', title: 'Credit & Business Verification', description: 'We\'re verifying your business information and running credit checks.', status: 'current'},
                  {icon: '3', title: 'Account Setup', description: 'Upon approval, we\'ll set up your account with appropriate credit limits.', status: 'pending'}
                ].map((step, index) => (
                  <InlineStack key={index} gap="400">
                    <div style={{
                      background: step.status === 'complete' ? '#00a047' : step.status === 'current' ? '#ffa500' : '#f6f6f7',
                      color: step.status === 'pending' ? '#6d7175' : 'white',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}>
                      {step.icon}
                    </div>
                    <BlockStack gap="100">
                      <Text variant="headingMd" as="h3">{step.title}</Text>
                      <Text tone="subdued">{step.description}</Text>
                    </BlockStack>
                  </InlineStack>
                ))}
              </BlockStack>

              <Banner tone="info">
                <BlockStack gap="200">
                  <Text variant="headingMd" as="h3">Expected Timeline</Text>
                  <Text><strong>Instant Approval:</strong> Some applications may be approved immediately.</Text>
                  <Text><strong>Standard Review:</strong> Most applications are processed within 1-2 business days.</Text>
                </BlockStack>
              </Banner>

              <InlineStack gap="200">
                <Button variant="primary" onClick={() => setCurrentScreen('home')}>🛍️ Start Shopping</Button>
                <Button onClick={() => setCurrentScreen('business-app')}>📧 Check Application Status</Button>
              </InlineStack>
            </BlockStack>
          </Box>
        </Card>
      </BlockStack>
    </Page>
  );

  // Quotes Screen Component
  const QuotesScreen = () => (
    <Page 
      title="My Quotes" 
      subtitle="Track and manage your quote requests"
      primaryAction={{content: 'New Quote', onAction: () => setCurrentScreen('quote-builder')}}
    >
      <Card>
        <Box padding="400">
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">Recent Quote Requests</Text>
            <ResourceList
              resourceName={{singular: 'quote', plural: 'quotes'}}
              items={[
                {
                  id: 'Q-2025-001',
                  name: 'Power Supply Module (25 units)',
                  date: 'June 23, 2025',
                  status: 'In Review',
                  amount: '$4,959.75',
                  badgeStatus: 'attention'
                },
                {
                  id: 'Q-2025-002',
                  name: 'Network Switch (5 units)',
                  date: 'June 22, 2025',
                  status: 'Ready',
                  amount: '$5,624.95',
                  badgeStatus: 'success'
                }
              ]}
              renderItem={(item) => {
                const {id, name, date, status, amount, badgeStatus} = item;
                return (
                  <ResourceItem id={id}>
                    <InlineStack align="space-between" blockAlign="center">
                      <BlockStack gap="200">
                        <Text variant="bodyMd" fontWeight="bold">{id}</Text>
                        <Text>{name}</Text>
                        <Text tone="subdued">Submitted: {date}</Text>
                      </BlockStack>
                      <BlockStack gap="200" inlineAlign="end">
                        <Badge tone={badgeStatus}>{status}</Badge>
                        <Text variant="headingMd" fontWeight="bold">{amount}</Text>
                      </BlockStack>
                    </InlineStack>
                  </ResourceItem>
                );
              }}
            />
          </BlockStack>
        </Box>
      </Card>
    </Page>
  );

  // Orders Screen Component
  const OrdersScreen = () => (
    <Page 
      title="Orders" 
      subtitle="Track your order history and status"
      primaryAction={{content: 'New Order', onAction: () => setCurrentScreen('products')}}
    >
      <Card>
        <Box padding="400">
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">Recent Orders</Text>
            <ResourceList
              resourceName={{singular: 'order', plural: 'orders'}}
              items={[
                {
                  id: '#1001',
                  name: 'Memory Modules & Components',
                  date: 'Mar 21, 2025',
                  status: 'Confirmed',
                  amount: '$1,679.90',
                  note: 'Payment due Apr 20',
                  badgeStatus: 'success'
                },
                {
                  id: '#1000',
                  name: 'Test Equipment Package',
                  date: 'Mar 15, 2025',
                  status: 'Delivered',
                  amount: '$3,299.99',
                  note: 'Paid',
                  badgeStatus: 'success'
                }
              ]}
              renderItem={(item) => {
                const {id, name, date, status, amount, note, badgeStatus} = item;
                return (
                  <ResourceItem id={id}>
                    <InlineStack align="space-between" blockAlign="center">
                      <BlockStack gap="200">
                        <Text variant="bodyMd" fontWeight="bold">Order {id}</Text>
                        <Text>{name}</Text>
                        <Text tone="subdued">Confirmed: {date}</Text>
                      </BlockStack>
                      <BlockStack gap="200" inlineAlign="end">
                        <Badge tone={badgeStatus}>{status}</Badge>
                        <Text variant="headingMd" fontWeight="bold">{amount}</Text>
                        <Text tone={note === 'Paid' ? 'success' : 'subdued'}>{note}</Text>
                      </BlockStack>
                    </InlineStack>
                  </ResourceItem>
                );
              }}
            />
          </BlockStack>
        </Box>
      </Card>
    </Page>
  );

  // Screen Router
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'products':
        return <ProductsScreen />;
      case 'product-detail':
        return <ProductDetailScreen />;
      case 'quote-builder':
        return <QuoteBuilderScreen />;
      case 'quote-success':
        return <QuoteSuccessScreen />;
      case 'quotes':
        return <QuotesScreen />;
      case 'orders':
        return <OrdersScreen />;
      case 'business-app':
        return <BusinessApplicationScreen />;
      case 'application-submitted':
        return <ApplicationSubmittedScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <AppLayout>
      {renderScreen()}
    </AppLayout>
  );
};

export default VellumApp;