# 📰 **FlashBrief - Attribute-Based Access Control Digital Newspaper**

FlashBrief is a **Next.js-based digital newspaper platform** that implements **Attribute-Based Access Control (ABAC)** for managing content visibility. It consists of two main sections:

1. **Admin Side** – Administrators create policies based on user attributes to control news visibility.
2. **User Side** – Users can only view news articles that they are authorized to see based on their attributes.

## 🔐 **Attribute-Based Access Control (ABAC)**

FlashBrief ensures **fine-grained access control** by allowing admins to define policies based on user attributes.

### 🔹 1. Admin Policy Management
- Admins create **custom access policies** based on attributes such as:
  - **User Role** (e.g., Student, Teacher, Researcher)
  - **Location** (e.g., Country, City)
  - **Subscription Level** (e.g., Free, Premium)
  - **Interest Tags** (e.g., Technology, Politics, Science)
- Policies determine **who can view specific news articles**.

### 🔹 2. User-Specific News Feed
- Users can **only access news articles** that match their attributes.
- The system dynamically filters news **based on defined policies**.
- Ensures **personalized content delivery** and **data security**.

