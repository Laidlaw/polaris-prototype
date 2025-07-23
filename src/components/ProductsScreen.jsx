import React from 'react';
import { Page, Grid, Card, BlockStack, Text, Button, ButtonGroup } from '@shopify/polaris';

const ProductsScreen = () => {
    return (
        <Page 
      title="Products" 
      subtitle="Browse our catalog of electronics and components"
      primaryAction={{content: 'Request Quote', onAction: () => setCurrentScreen('quote-builder')}}
    >
      <Grid>
        {[
          {icon: '🔌', title: 'Power Supply Module', price: '$247.99', description: 'High-efficiency 500W power supply'},
          {icon: '💾', title: 'Memory Module', price: '$189.99', description: 'DDR4 32GB ECC memory'},
          {icon: '🖥️', title: 'Display Monitor', price: '$599.99', description: '27" 4K professional monitor'},
          {icon: '📡', title: 'Network Switch', price: '$1,249.99', description: '24-port managed switch'},
          {icon: '🔧', title: 'Oscilloscope', price: '$3,299.99', description: '4-channel digital scope'},
          {icon: '🔌', title: 'Cable Assembly', price: '$89.99', description: 'Custom connector cable'}
        ].map((product, index) => (
          <Grid.Cell key={index} columnSpan={{xs: 6, sm: 4, md: 4, lg: 4, xl: 4}}>
            <Card sectioned>
              <BlockStack vertical spacing="tight">
                <div style={{textAlign: 'center', fontSize: '48px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: '8px', padding: '40px'}}>
                  {product.icon}
                </div>
                <Text variant="headingX1" as="h4">{product.title}</Text>
                <Text variant="headingMd" color="success">{product.price}</Text>
                <Text>{product.description}</Text>
                <ButtonGroup>
                  <Button onClick={() => setCurrentScreen('product-detail')}>View Details</Button>
                  <Button variant="primary" onClick={() => setCurrentScreen('quote-builder')}>Request Quote</Button>
                </ButtonGroup>
              </BlockStack>
            </Card>
          </Grid.Cell>
        ))}
      </Grid>
    </Page>
    );
};

export default ProductsScreen;
