# 📰 **FlashBrief - Attribute-Based Access Control Digital Newspaper**

FlashBrief is a **Next.js-based digital newspaper platform** that implements **Attribute-Based Access Control (ABAC)** for managing content visibility. It consists of two main sections:

1. **Admin Side** – Administrators create policies based on user attributes to control news visibility.
2. **User Side** – Users can only view news articles that they are authorized to see based on their attributes.

## 🔐 **Attribute-Based Access Control (ABAC)**

FlashBrief ensures **fine-grained access control** by allowing admins to define policies based on user attributes.

### 🔹 1. Admin Policy Management
- Admins create **custom access policies** based on attributes such as:
  - **User Age** 
  - **Gender** 
  - **Country** 
- Policies determine **who can view specific news articles**.

### 🔹 2. Applying Policies to News Articles  
- When publishing a news article, admins can **assign access policies**.  
- Only users who **match the defined attributes** can view the article.  
- Users who do not satisfy the conditions **cannot access restricted content**.  


### 🔹 3. User-Specific News Feed
- Users can **only access news articles** that match their attributes.
- The system dynamically filters news **based on defined policies**.
- Ensures **personalized content delivery** and **data security**.

## Admin End – Creating and Applying Policies 

https://github.com/user-attachments/assets/f63516b6-4f34-4f43-8e72-12c1ba944be9

## User End – Accessing News Based on Policies

https://github.com/user-attachments/assets/9721b4b1-da0c-4a97-80a2-0f1888cba800




