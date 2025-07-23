import React, { useState } from 'react';
import { Page, Layout, Card, BlockStack, Text, Banner, FormLayout, TextField, DataTable } from '@shopify/polaris';


// Product Detail Screen Component
  const ProductDetailScreen = () => {
    const volumePricingData = [
      ['Quantity', 'Unit Price', 'Savings'],
      ['1-9', '$247.99', '-'],
      ['10-24', '$223.19', '10% ($24.80)'],
      ['25+', '$198.39', '20% ($49.60)'],
    ];

    return (
      <Page 
        title="Power Supply Module" 
        breadcrumbs={[{content: 'Products', onAction: () => setCurrentScreen('products')}]}
        primaryAction={{content: 'Add to Quote', onAction: () => setCurrentScreen('quote-builder')}}
        secondaryActions={[
          {content: 'Add to Cart'},
          {content: 'Buy with ShopPay'}
        ]}
      >
        <Layout>
          <Layout.Section oneHalf>
            <Card sectioned>
              <div style={{
                textAlign: 'center', 
                fontSize: '96px', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                color: 'white', 
                borderRadius: '8px', 
                padding: '80px',
                marginBottom: '16px'
              }}>
                🔌
              </div>
              <BlockStack distribution="fillEvenly">
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
                ))}
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section oneHalf>
            <Card sectioned>
              <BlockStack vertical spacing="loose">
                <div>
                  <Text variant="bodySm" color="subdued">SKU: PSU-500W-MOD</Text>
                  <BlockStack>
                    <Text>⭐⭐⭐⭐⭐</Text>
                    <Text variant="bodySm" color="subdued">(24 reviews)</Text>
                  </BlockStack>
                </div>

                <Banner status="info">
                  <BlockStack vertical spacing="tight">
                    <Text variant="headingLg" color="success">$247.99</Text>
                    <Text variant="bodySm">Volume discounts available • Net payment terms for business customers</Text>
                  </BlockStack>
                </Banner>

                <FormLayout>
                  <TextField
                    label="Quantity"
                    type="number"
                    value="1"
                    min="1"
                    autoComplete="off"
                  />
                  <TextField
                    label="Expected Delivery"
                    type="date"
                    autoComplete="off"
                  />
                </FormLayout>

                <BlockStack distribution="fill">
                  <Text>✅ Free shipping</Text>
                  <Text>✅ 5-year warranty</Text>
                </BlockStack>
              </BlockStack>
            </Card>

            <Card title="Volume Pricing" sectioned>
              <DataTable
                columnContentTypes={['text', 'text', 'text']}
                headings={volumePricingData[0]}
                rows={volumePricingData.slice(1)}
              />
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card sectioned>
              <BlockStack vertical spacing="loose">
                <Text variant="heading3x1" as="h2">Product Description</Text>
                <Text>
                  High-efficiency 500W modular power supply unit designed for professional applications. 
                  Features 80 PLUS Gold certification, fully modular cables, and comprehensive protection circuits.
                </Text>
                
                <div>
                  <Heading>Specifications:</Heading>
                  <ul style={{marginLeft: '20px', marginTop: '8px'}}>
                    <li>Output Power: 500W</li>
                    <li>Efficiency: 90% (80 PLUS Gold)</li>
                    <li>Modular Design: Fully modular cables</li>
                    <li>Protection: OVP, UVP, SCP, OPP, OTP</li>
                    <li>Cooling: 120mm quiet fan</li>
                    <li>Warranty: 5 years</li>
                  </ul>
                </div>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  };

  export default ProductDetailScreen;