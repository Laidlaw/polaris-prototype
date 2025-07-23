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
  BlockStack,
  Text,
  Thumbnail,
  ResourceList,
  ResourceItem,
  Avatar,
  FormLayout,
  Tabs,
  DataTable,
  EmptyState,
  ProgressBar,
  Icon
} from '@shopify/polaris';
import {
  HomeIcon,
  ProductIcon,
  NoteIcon,
  OrderIcon,
  PersonIcon,
  SearchIcon,
  PlusIcon
} from '@shopify/polaris-icons';

import HomeScreen from './components/HomeScreen.jsx';
import ProductsScreen from './components/ProductsScreen.jsx';
import ProductDetailScreen from './components/ProductDetailScreen.jsx';
// import QuoteBuilderScreen from './components/QuoteBuilderScreen.jsx';
// import QuoteSuccessScreen from './components/QuoteSuccessScreen.jsx';
// import BusinessApplicationScreen from './components/BusinessApplicationScreen.jsx';
// import ApplicationSubmittedScreen from './components/ApplicationSubmittedScreen.jsx';
// import QuotesScreen from './components/QuotesScreen.jsx';
// import OrdersScreen from './components/OrdersScreen.jsx';


// Copy the entire VellumApp component from the previous artifact here
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Form states
  const [quoteQuantity, setQuoteQuantity] = useState('25');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('');

  const toggleUserMenuOpen = useCallback(
    () => setUserMenuOpen((userMenuOpen) => !userMenuOpen),
    [],
  );

  const toggleMobileNavigationActive = useCallback(
    () => setMobileNavigationActive(
      (mobileNavigationActive) => !mobileNavigationActive,
    ),
    [],
  );

  const toggleSearchActive = useCallback(
    () => setSearchActive((searchActive) => !searchActive),
    [],
  );

  const handleSearchChange = useCallback((value) => setSearchText(value), []);

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            url: '#',
            label: 'Home',
            icon: HomeIcon,
            selected: currentScreen === 'home',
            onClick: () => setCurrentScreen('home'),
          },
          {
            url: '#',
            label: 'Products',
            icon: ProductIcon,
            selected: ['products', 'product-detail'].includes(currentScreen),
            onClick: () => setCurrentScreen('products'),
          },
          {
            url: '#',
            label: 'Quotes',
            icon: NoteIcon,
            selected: ['quotes', 'quote-builder', 'quote-success'].includes(currentScreen),
            onClick: () => setCurrentScreen('quotes'),
          },
          {
            url: '#',
            label: 'Orders',
            icon: OrderIcon,
            selected: currentScreen === 'orders',
            onClick: () => setCurrentScreen('orders'),
          },
          {
            url: '#',
            label: 'Business Account',
            icon: PersonIcon,
            selected: ['business-app', 'application-submitted'].includes(currentScreen),
            onClick: () => setCurrentScreen('business-app'),
          },
        ]}
      />
    </Navigation>
  );

  const searchResultsMarkup = (
    <Card>
      <ResourceList
        resourceName={{singular: 'product', plural: 'products'}}
        items={[
          {
            id: '1',
            name: 'Power Supply Module',
            price: '$247.99',
            category: 'Electronics'
          },
          {
            id: '2',
            name: 'Memory Module',
            price: '$189.99',
            category: 'Computing'
          },
        ]}
        renderItem={(item) => {
          const {id, name, price, category} = item;
          return (
            <ResourceItem
              id={id}
              onClick={() => setCurrentScreen('product-detail')}
            >
              <BlockStack>
                <BlockStack.Item fill>
                  <Text variant="bodyMd" fontWeight="bold" as="h3">
                    {name}
                  </Text>
                  <Text variant="bodySm" color="subdued">
                    {category} • {price}
                  </Text>
                </BlockStack.Item>
              </BlockStack>
            </ResourceItem>
          );
        }}
      />
    </Card>
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchChange}
      value={searchText}
      placeholder="Search products, orders, quotes..."
    />
  );

  const userMenuActions = [
    {
      items: [{content: 'Community forums'}],
    },
  ];

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={
        <TopBar.UserMenu
          actions={userMenuActions}
          name="Alex Sage"
          detail="Vellum Customer"
          initials="AS"
          open={userMenuOpen}
          onToggle={toggleUserMenuOpen}
        />
      }
      searchResultsVisible={searchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={toggleSearchActive}
      onNavigationToggle={toggleMobileNavigationActive}
      secondaryMenu={
        <ButtonGroup>
          <Button onClick={() => setCurrentScreen('business-app')}>
            Business Application
          </Button>
          <Button>Create Account</Button>
          <Button variant="primary">Log In</Button>
        </ButtonGroup>
      }
    />
  );

  

  

  

  // Quote Builder Screen Component
  const QuoteBuilderScreen = () => (
    <Page 
      title="Request Quote" 
      subtitle="Get volume pricing for your business needs"
      breadcrumbs={[{content: 'Products', onAction: () => setCurrentScreen('products')}]}
    >
      <Layout>
        <Layout.Section oneHalf>
          <Card title="Quote Items" sectioned>
            <BlockStack vertical spacing="loose">
              <Card sectioned>
                <BlockStack>
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
                  <BlockStack.Item fill>
                    <BlockStack vertical spacing="tight">
                      <Text variant="heading3x1" as="h2">Power Supply Module</Text>
                      <Text variant="bodySm" color="subdued">500W, Modular, 80+ Gold</Text>
                      <TextField
                        label="Quantity"
                        type="number"
                        value={quoteQuantity}
                        onChange={setQuoteQuantity}
                        min="1"
                        autoComplete="off"
                      />
                    </BlockStack>
                  </BlockStack.Item>
                  <BlockStack vertical alignment="trailing">
                    <Text variant="headingMd" color="success">$198.39</Text>
                    <Text variant="bodySm" color="subdued">per unit</Text>
                  </BlockStack>
                </BlockStack>
              </Card>

              <Banner status="success">
                <BlockStack vertical spacing="tight">
                  <BlockStack distribution="equalSpacing">
                    <Text>Subtotal ({quoteQuantity} units):</Text>
                    <Text>${(parseFloat(quoteQuantity) * 198.39).toFixed(2)}</Text>
                  </BlockStack>
                  <BlockStack distribution="equalSpacing">
                    <Text>Volume Discount (20%):</Text>
                    <Text color="success">-${((parseFloat(quoteQuantity) * 247.99) - (parseFloat(quoteQuantity) * 198.39)).toFixed(2)}</Text>
                  </BlockStack>
                  <BlockStack distribution="equalSpacing">
                    <Text variant="headingMd">Estimated Total:</Text>
                    <Text variant="headingMd">${(parseFloat(quoteQuantity) * 198.39).toFixed(2)}</Text>
                  </BlockStack>
                </BlockStack>
              </Banner>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section oneHalf>
          <Card title="Contact Information" sectioned>
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
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );

  // Quote Success Screen Component
  const QuoteSuccessScreen = () => (
    <Page title="">
      <Banner
        title="✅ Quote Request Submitted"
        status="success"
      >
        <Text>Thank you! Your quote request has been received and is being processed.</Text>
      </Banner>

      <Card title="What Happens Next?" sectioned>
        <BlockStack vertical spacing="loose">
          {[
            {step: '1', title: 'Review & Analysis', description: 'Our team will review your requirements and verify product availability.'},
            {step: '2', title: 'Custom Pricing', description: 'We\'ll prepare competitive volume pricing based on your quantity and timeline.'},
            {step: '3', title: 'Quote Delivery', description: 'You\'ll receive a detailed quote via email within 24 hours.'},
            {step: '4', title: 'Follow-up', description: 'Our sales team may contact you to discuss additional options or answer questions.'}
          ].map((item, index) => (
            <BlockStack key={index}>
              <div style={{
                background: '#00a047', 
                color: 'white', 
                borderRadius: '50%', 
                width: '32px', 
                height: '32px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 'bold'
              }}>
                {item.step}
              </div>
              <BlockStack.Item fill>
                <BlockStack vertical spacing="tight">
                  <Text variant="heading3x1" as="h2">{item.title}</Text>
                  <Text color="subdued">{item.description}</Text>
                </BlockStack>
              </BlockStack.Item>
            </BlockStack>
          ))}
        </BlockStack>

        <Banner status="info">
          <BlockStack vertical spacing="tight">
            <Text variant="headingX1" as="h4">PExpected Timeline</Text>
            <Text><strong>Instant Approval:</strong> Some applications may be approved immediately.</Text>
            <Text><strong>Standard Review:</strong> Most applications are processed within 1-2 business days.</Text>
          </BlockStack>
        </Banner>

        <ButtonGroup>
          <Button variant="primary" onClick={() => setCurrentScreen('home')}>🛍️ Continue Shopping</Button>
          <Button onClick={() => setCurrentScreen('quotes')}>📋 View My Quotes</Button>
        </ButtonGroup>
      </Card>
    </Page>
  );

  // Business Application Screen Component
  const BusinessApplicationScreen = () => (
    <Page title="Apply for Business Account" subtitle="Unlock volume pricing, net payment terms, and dedicated support for your business">
      <Banner
        title="Business Benefits"
        status="info"
      >
        <ul style={{listStyle: 'none', padding: 0}}>
          {[
            'Volume pricing discounts up to 30%',
            'Net 30/60/90 payment terms',
            'Working capital financing',
            'Dedicated account manager',
            'Priority customer support',
            'Custom pricing agreements'
          ].map((benefit, index) => (
            <li key={index} style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px'}}>
              <span style={{color: '#00a047'}}>✓</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </Banner>

      <Layout>
        <Layout.Section>
          <Card title="Business Information" sectioned>
            <FormLayout>
              <FormLayout.Group>
                <TextField
                  label="Company Name"
                  value={companyName}
                  onChange={setCompanyName}
                  placeholder="Your Company Name"
                  autoComplete="organization"
                  required
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
                  required
                />
              </FormLayout.Group>
              
              <FormLayout.Group>
                <TextField
                  label="Federal Tax ID (EIN)"
                  placeholder="XX-XXXXXXX"
                  autoComplete="off"
                  required
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
                  required
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
                  required
                />
                <TextField
                  label="Website"
                  type="url"
                  placeholder="https://yourcompany.com"
                  autoComplete="url"
                />
              </FormLayout.Group>
            </FormLayout>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card title="Contact Information" sectioned>
            <FormLayout>
              <TextField
                label="Primary Contact Name"
                value={contactName}
                onChange={setContactName}
                placeholder="John Doe"
                autoComplete="name"
                required
              />
              <TextField
                label="Email Address"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="john@company.com"
                autoComplete="email"
                required
              />
              <TextField
                label="Phone Number"
                type="tel"
                value={phone}
                onChange={setPhone}
                placeholder="(555) 123-4567"
                autoComplete="tel"
                required
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
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );

  // Application Submitted Screen Component
  const ApplicationSubmittedScreen = () => (
    <Page title="">
      <Banner
        title="🎉 Application Submitted!"
        status="success"
      >
        <Text>Thank you for applying for a business account. We'll review your application and get back to you soon.</Text>
      </Banner>

      <Card title="Application Status" sectioned>
        <BlockStack vertical spacing="loose">
          <BlockStack>
            <Badge status="attention">📋 Under Review</Badge>
            <Text>Application #VEL-2025-001</Text>
          </BlockStack>

          <BlockStack vertical spacing="loose">
            {[
              {icon: '✓', title: 'Application Received', description: 'Your business application has been successfully submitted.', status: 'complete'},
              {icon: '2', title: 'Credit & Business Verification', description: 'We\'re verifying your business information and running credit checks.', status: 'current'},
              {icon: '3', title: 'Account Setup', description: 'Upon approval, we\'ll set up your account with appropriate credit limits.', status: 'pending'}
            ].map((step, index) => (
              <BlockStack key={index}>
                <div style={{
                  background: step.status === 'complete' ? '#00a047' : step.status === 'current' ? '#ffa500' : '#f6f6f7',
                  color: step.status === 'pending' ? '#6d7175' : 'white',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  {step.icon}
                </div>
                <BlockStack.Item fill>
                  <BlockStack vertical spacing="tight">
                    <Heading>{step.title}</Heading>
                    <Text color="subdued">{step.description}</Text>
                  </BlockStack>
                </BlockStack.Item>
              </BlockStack>
            ))}
          </BlockStack>

          <Banner status="info">
            <BlockStack vertical spacing="tight">
              <Text variant="heading3x1" as="h2">Expected Timeline</Text>
              <Text><strong>Instant Approval:</strong> Some applications may be approved immediately.</Text>
              <Text><strong>Standard Review:</strong> Most applications are processed within 1-2 business days.</Text>
            </BlockStack>
          </Banner>

          <ButtonGroup>
            <Button variant="primary" onClick={() => setCurrentScreen('home')}>🛍️ Start Shopping</Button>
            <Button onClick={() => setCurrentScreen('business-app')}>📧 Check Application Status</Button>
          </ButtonGroup>
        </BlockStack>
      </Card>
    </Page>
  );

  // Quotes Screen Component
  const QuotesScreen = () => (
    <Page 
      title="My Quotes" 
      subtitle="Track and manage your quote requests"
      primaryAction={{content: 'New Quote', onAction: () => setCurrentScreen('quote-builder')}}
    >
      <Card title="Recent Quote Requests" sectioned>
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
                <BlockStack distribution="equalSpacing" alignment="center">
                  <BlockStack.Item fill>
                    <BlockStack vertical spacing="tight">
                      <Text variant="bodyMd" fontWeight="bold">{id}</Text>
                      <Text>{name}</Text>
                      <Text variant="bodySm" color="subdued">Submitted: {date}</Text>
                    </BlockStack>
                  </BlockStack.Item>
                  <BlockStack vertical alignment="trailing">
                    <Badge status={badgeStatus}>{status}</Badge>
                    <Text variant="headingMd" fontWeight="bold">{amount}</Text>
                  </BlockStack>
                </BlockStack>
              </ResourceItem>
            );
          }}
        />
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
      <Card title="Recent Orders" sectioned>
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
                <BlockStack distribution="equalSpacing" alignment="center">
                  <BlockStack.Item fill>
                    <BlockStack vertical spacing="tight">
                      <Text variant="bodyMd" fontWeight="bold">Order {id}</Text>
                      <Text>{name}</Text>
                      <Text variant="bodySm" color="subdued">Confirmed: {date}</Text>
                    </BlockStack>
                  </BlockStack.Item>
                  <BlockStack vertical alignment="trailing">
                    <Badge status={badgeStatus}>{status}</Badge>
                    <Text variant="headingMd" fontWeight="bold">{amount}</Text>
                    <Text variant="bodySm" color={note === 'Paid' ? 'success' : 'subdued'}>{note}</Text>
                  </BlockStack>
                </BlockStack>
              </ResourceItem>
            );
          }}
        />
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

      
        
          <div>{renderScreen()}</div>
        
      
    
  );
// ... (paste the VellumApp component code)
};

export default App;
