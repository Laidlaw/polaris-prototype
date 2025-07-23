// Home Screen Component
 import React from 'react';
import {Page, Grid, Card, BlockStack, Text, Button, ButtonGroup, Layout } from '@shopify/polaris';
/* Replace all <Heading> with <Text variant="headingX1" as="h4"> and </Heading> with </Text> */

const HomeScreen = () => {
  return (
    <Page title="Welcome to Vellum" subtitle="Your B2B electronics marketplace with flexible payment terms">
      <Layout>
        <Layout.Section>
          <Card title="Product Categories" sectioned>
            <Grid>
              <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
                <Card sectioned>
                  <BlockStack vertical spacing="tight">
                    <div style={{textAlign: 'center', fontSize: '48px'}}>🔌</div>
                    <Text variant="headingX1" as="h4">Electronics</Text>
                    <Text>Components & Devices</Text>
                    <Button onClick={() => setCurrentScreen('products')}>Browse</Button>
                  </BlockStack>
                </Card>
              </Grid.Cell>
              <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
                <Card sectioned>
                  <BlockStack vertical spacing="tight">
                    <div style={{textAlign: 'center', fontSize: '48px'}}>💻</div>
                    <Text variant="headingX1" as="h4">Computing</Text>
                    <Text>Hardware & Accessories</Text>
                    <Button onClick={() => setCurrentScreen('products')}>Browse</Button>
                  </BlockStack>
                </Card>
              </Grid.Cell>
              <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
                <Card sectioned>
                  <BlockStack vertical spacing="tight">
                    <div style={{textAlign: 'center', fontSize: '48px'}}>📡</div>
                    <Text variant="headingX1" as="h4">Networking</Text>
                    <Text>Routers & Switches</Text>
                    <Button onClick={() => setCurrentScreen('products')}>Browse</Button>
                  </BlockStack>
                </Card>
              </Grid.Cell>
              <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 3, xl: 3}}>
                <Card sectioned>
                  <BlockStack vertical spacing="tight">
                    <div style={{textAlign: 'center', fontSize: '48px'}}>🔧</div>
                    <Text variant="headingX1" as="h4">Tools</Text>
                    <Text>Test Equipment</Text>
                    <Button onClick={() => setCurrentScreen('products')}>Browse</Button>
                  </BlockStack>
                </Card>
              </Grid.Cell>
            </Grid>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card title="Featured Products" sectioned>
            <Grid>
              <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 4, xl: 4}}>
                <Card sectioned>
                  <BlockStack vertical spacing="tight">
                    <div style={{textAlign: 'center', fontSize: '48px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '8px', padding: '40px'}}>🔌</div>
                    <Text variant="heading3x1" as="h2">Power Supply Module</Text>
                    <Text variant="headingMd" color="success">$247.99</Text>
                    <Text>High-efficiency 500W power supply with modular cables</Text>
                    <ButtonGroup>
                      <Button onClick={() => setCurrentScreen('product-detail')}>View Details</Button>
                      <Button variant="primary" onClick={() => setCurrentScreen('quote-builder')}>Request Quote</Button>
                    </ButtonGroup>
                  </BlockStack>
                </Card>
              </Grid.Cell>
              <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 4, xl: 4}}>
                <Card sectioned>
                  <BlockStack vertical spacing="tight">
                    <div style={{textAlign: 'center', fontSize: '48px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '8px', padding: '40px'}}>💾</div>
                    <Text variant="heading3x1" as="h2">Memory Module</Text>
                    <Text variant="headingMd" color="success">$189.99</Text>
                    <Text>DDR4 32GB ECC registered memory module</Text>
                    <ButtonGroup>
                      <Button onClick={() => setCurrentScreen('product-detail')}>View Details</Button>
                      <Button variant="primary" onClick={() => setCurrentScreen('quote-builder')}>Request Quote</Button>
                    </ButtonGroup>
                  </BlockStack>
                </Card>
              </Grid.Cell>
              <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 4, xl: 4}}>
                <Card sectioned>
                  <BlockStack vertical spacing="tight">
                    <div style={{textAlign: 'center', fontSize: '48px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '8px', padding: '40px'}}>📡</div>
                    <Text variant="heading3x1" as="h2">Network Switch</Text>
                    <Text variant="headingMd" color="success">$1,249.99</Text>
                    <Text>24-port managed gigabit switch with PoE+</Text>
                    <ButtonGroup>
                      <Button onClick={() => setCurrentScreen('product-detail')}>View Details</Button>
                      <Button variant="primary" onClick={() => setCurrentScreen('quote-builder')}>Request Quote</Button>
                    </ButtonGroup>
                  </BlockStack>
                </Card>
              </Grid.Cell>
            </Grid>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
export default HomeScreen;