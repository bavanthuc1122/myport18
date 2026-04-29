// scripts/test-query.js
import {createClient} from '@sanity/client'

// Khởi tạo client
const client = createClient({
  projectId: '8ucvng19',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false
})

// Truy vấn dữ liệu
async function testQueries() {
  try {
    // Test truy vấn Hero Section
    const heroSection = await client.fetch(`*[_type == "heroSection" && _id == "da39dcb4-8b7c-4d1d-9e57-ac72110d1c55"][0] || *[_type == "heroSection"][0]`)
    console.log('Hero Section:', heroSection ? { _id: heroSection._id, title: heroSection.title } : null)
    
    // Test truy vấn Portfolio Preview
    const portfolioPreview = await client.fetch(`*[_type == "portfolioPreview" && _id == "671ed856-4b45-42f9-8f93-9305a3867380"][0] || *[_type == "portfolioPreview"][0]`)
    console.log('Portfolio Preview:', portfolioPreview ? { _id: portfolioPreview._id, title: portfolioPreview.title } : null)
    
    // Test truy vấn About Section
    const aboutSection = await client.fetch(`*[_type == "aboutSection" && _id == "77522e42-930c-49c4-8797-0a1452c72f34"][0] || *[_type == "aboutSection"][0]`)
    console.log('About Section:', aboutSection ? { _id: aboutSection._id, title: aboutSection.title } : null)
    
    // Test truy vấn đơn giản
    const allHeroSections = await client.fetch(`*[_type == "heroSection"]`)
    console.log('All Hero Sections:', allHeroSections.map(doc => ({ _id: doc._id, title: doc.title })))
    
    const allPortfolioPreviews = await client.fetch(`*[_type == "portfolioPreview"]`)
    console.log('All Portfolio Previews:', allPortfolioPreviews.map(doc => ({ _id: doc._id, title: doc.title })))
    
    const allAboutSections = await client.fetch(`*[_type == "aboutSection"]`)
    console.log('All About Sections:', allAboutSections.map(doc => ({ _id: doc._id, title: doc.title })))
  } catch (error) {
    console.error('Error testing queries:', error)
  }
}

// Chạy hàm
testQueries()
