# 🛍️ EShop - Modern E-Commerce Platform-Frontend

#### Welcome to EShop !
A full-stack e-commerce platform built with **Next.js 16, TypeScript, Prisma, Redux Toolkit (RTK Query), PostgreSQL**. Features multi-vendor support, real-time inventory management, advanced product filtering, and seamless payment integration.

## Frontend Live Link: https://eshop-frontend-website.vercel.app/


## 🚀 Features

### 👤 Authentication & Authorization

- User Registration & Login

- JWT based 

- Cookie-based session management

- Role based access:

   - SUPER_ADMIN

   - ADMIN

  - VENDOR

  - CUSTOMER

- Protected routes (Admin, Vendor, Customer)

### 👥 Multi-User System

 ### Admin Features


- Manage user accounts (vendors and customers), including options to suspend or delete accounts.

- Blacklist vendor shops to stop their operations.

- Dynamically manage product categories (add, edit, or delete categories).

- Manage platform content, including vendor shops and product categories.

- Coupon management for order.
- Checking review for vendor and customer.
- Update profile and changing password.

### Vendor Features


- Create and manage shop profiles.
- Changing password for secure. 
- Product inventory management.
- Create flash sell for product.

- View order history. 
- Respond to customer reviews.
- Follower analytics.



### Customer Features

- Browse, filter, and compare products from multiple vendors.

- Add items to the cart, purchase products, and leave reviews for purchased items.

- Integrate with payment systems like Aamarpay with MasterCard and mobile banking  for secure transactions.

- Access order history to review past purchases.

- Leave reviews and ratings for purchased products.

- View vendor reply.

- Update profile and changing password.

---



## 🛠️ Tech Stack

### Frontend:


- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + Radix UI
- **State Management**: Redux Toolkit + RTK Query
- **Notifications**: Sonner/React-Toastify
- **Icons**: Lucide React + React-icons
- **Image Upload**: Cloudinary

### Backend:

- **Runtime**: Node.js with Express
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **File Upload**: multer-storage-cloudinary
- **Payment**: Aamarpay


---

## 🚀 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd eShop-Frontend-Website
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Configure environment variables** (see [Environment Variables](#environment-variables))

---

## 🔧 Environment Variables

Create a `.env` file in the frontend root directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Frontend URL (for redirects)
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

# JWT Access Secret (must match backend)
JWT_ACCESS_SECRET=your_jwt_access_secret_key
```

---

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
Application runs on `http://localhost:3000` with hot reload.

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

---

## 📁 Project Structure

```
eShop-Frontend-Website/
├─ src/
│  ├─ app/                         # Next.js App Router
│  │  ├─ (commonLayout)/           # Public pages layout
│  │  │  ├─ about-us/
│  │  │  │  └─ page.tsx
│  │  │  ├─ all-products/          # All product page
│  │  │  │  └─ page.tsx
│  │  │  ├─ blog/                  # Blog page
│  │  │  │  ├─ BlogCard.tsx
│  │  │  │  └─ page.tsx
│  │  │  ├─ checkout/              # Checkout for payment
│  │  │  │  ├─ success/
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ page.tsx
│  │  │  ├─ conditions/            # Terms and conditions page
│  │  │  │  └─ page.tsx
│  │  │  ├─ contact/
│  │  │  │  └─ page.tsx
│  │  │  ├─ faq/
│  │  │  │  └─ page.tsx
│  │  │  ├─ flash-sale/
│  │  │  │  └─ page.tsx
│  │  │  ├─ flashSale/
│  │  │  │  └─ page.tsx
│  │  │  ├─ forgot-password/
│  │  │  │  ├─ CheckEmail.tsx
│  │  │  │  └─ page.tsx
│  │  │  ├─ login/                  # Login page
│  │  │  │  └─ page.tsx
│  │  │  ├─ news/
│  │  │  │  └─ page.tsx
│  │  │  ├─ payment-failed/         # Payment Failed
│  │  │  │  └─ page.tsx
│  │  │  ├─ payment-success/        # Payment Success
│  │  │  │  └─ page.tsx
│  │  │  ├─ policy/
│  │  │  │  └─ page.tsx
│  │  │  ├─ product/
│  │  │  │  └─ [id]/
│  │  │  │     └─ page.tsx
│  │  │  ├─ register/               # Registration page
│  │  │  │  └─ page.tsx
│  │  │  ├─ reset-password/
│  │  │  │  └─ page.tsx
│  │  │  ├─ shop/                   # All Shop page
│  │  │  │  └─ page.tsx
│  │  │  ├─ shop-page/
│  │  │  │  └─ page.tsx
│  │  │  ├─ HomeClient.tsx
│  │  │  ├─ layout.tsx
│  │  │  └─ page.tsx                 # Homepage
│  │  ├─ (dashboardLayout)/          # Dashboard layout
│  │  │  ├─ dashboard/
│  │  │  │  ├─ admin/                # Admin dashboard
│  │  │  │  │  ├─ admin-profile/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ all-reviews/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ coupon/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ manage-categories/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ manage-shops/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ manage-user/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ password-settings/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ transactions/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ customer/              # Customer dashboard
│  │  │  │  │  ├─ followed-shop/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ my-orders/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ settings/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ page.tsx
│  │  │  │  ├─ vendor/                # Vendor dashboard
│  │  │  │  │  ├─ create-product/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ edit-product/
│  │  │  │  │  │  └─ [id]/
│  │  │  │  │  │     └─ page.tsx
│  │  │  │  │  ├─ manage-orders/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ manage-products/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ manage-reviews/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ password-settings/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  ├─ update-shop/
│  │  │  │  │  │  └─ page.tsx
│  │  │  │  │  └─ page.tsx
│  │  │  │  └─ page.tsx                # Dashboard Root
│  │  │  └─ layout.tsx                 
│  │  ├─ error.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ loading.tsx
│  │  └─ not-found.tsx
│  ├─ components/                       # All Components
│  │  ├─ AllProducts/
│  │  │  └─ NotProductFound.tsx
│  │  ├─ CouponManagement/
│  │  │  ├─ CreateCoupon.tsx
│  │  │  └─ UpdateCoupon.tsx
│  │  ├─ Dashboard/
│  │  │  ├─ CustomTooltip.tsx
│  │  │  ├─ DashboardStats.tsx
│  │  │  ├─ MonthlyChart.tsx
│  │  │  ├─ OverviewPieChart.tsx
│  │  │  ├─ StatCard.tsx
│  │  │  └─ UserDistributionChart.tsx
│  │  ├─ falshSale/                      # Flash Sale component
│  │  │  ├─ FlashSaleBanner.tsx
│  │  │  └─ FlashSaleProducts.tsx
│  │  ├─ Home/
│  │  │  ├─ BestDeal.tsx
│  │  │  ├─ BundleSet.tsx
│  │  │  ├─ Category.tsx
│  │  │  ├─ FlashSaleProduct.tsx
│  │  │  ├─ NavSearchCard.tsx
│  │  │  ├─ QuantitySelector.tsx
│  │  │  ├─ RangeSlider.tsx
│  │  │  ├─ Support.tsx
│  │  │  ├─ vendorCard.tsx
│  │  │  └─ WhyChoseUs.tsx
│  │  ├─ HomePage/
│  │  │  ├─ HomePageProductCard.tsx
│  │  │  └─ Products.tsx
│  │  ├─ ManageCategories/
│  │  │  ├─ CategoryDelete.tsx
│  │  │  ├─ CategoryTable.tsx
│  │  │  ├─ CreateCategory.tsx
│  │  │  └─ EditCategory.tsx
│  │  ├─ ManageProducts/
│  │  │  ├─ DuplicateProduct.tsx
│  │  │  ├─ ProductDelete.tsx
│  │  │  └─ ProductTable.tsx
│  │  ├─ ManageUsers/
│  │  │  ├─ DeleteUser.tsx
│  │  │  ├─ SuspendUser.tsx
│  │  │  ├─ UserRoleSelector.tsx
│  │  │  └─ UsersTable.tsx
│  │  ├─ ManageVendorProduct/
│  │  │  └─ ManageVendorProducts.tsx
│  │  ├─ MangeShops/
│  │  │  ├─ ShopsTable.tsx
│  │  │  └─ ToggleBlackListShop.tsx
│  │  ├─ MostViewsProducts/
│  │  │  └─ RecentProduct.tsx
│  │  ├─ MyOrders/
│  │  │  └─ AddReview.tsx
│  │  ├─ MyShop/
│  │  │  └─ ShopForm.tsx
│  │  ├─ Navbar/
│  │  │  ├─ Cart.tsx
│  │  │  ├─ Navbar.tsx
│  │  │  ├─ NavbarLink.tsx
│  │  │  └─ UserDropDown.tsx
│  │  ├─ productComparison/
│  │  │  └─ ComparisonModal.tsx
│  │  ├─ shared/                        # Shared components
│  │  │  ├─ Banner.tsx
│  │  │  ├─ ConflictWarningModal.tsx
│  │  │  ├─ DashboardHeader.tsx
│  │  │  ├─ DashboardNav.tsx
│  │  │  ├─ DashboardSidebar.tsx
│  │  │  ├─ Footer.tsx
│  │  │  └─ Header.tsx
│  │  ├─ ui/                            # Radix UI components
│  │  │  ├─ avatar.tsx
│  │  │  ├─ button.tsx
│  │  │  ├─ card.tsx
│  │  │  ├─ dialog.tsx
│  │  │  ├─ dropdown-menu.tsx
│  │  │  ├─ hover-card.tsx
│  │  │  ├─ input.tsx
│  │  │  ├─ label.tsx
│  │  │  ├─ navigate-menu.tsx
│  │  │  ├─ select.tsx
│  │  │  ├─ skeleton.tsx
│  │  │  ├─ table.tsx
│  │  │  └─ textarea.tsx
│  │  ├─ uiElements/
│  │  │  ├─ DashboardHeading.tsx
│  │  │  ├─ NextSearchBox.tsx
│  │  │  └─ NoTableDataFound.tsx
│  │  └─ error.tsx
│  ├─ config/                             # env config
│  │  ├─ envData.ts
│  │  └─ site.ts
│  ├─ hooks/
│  │  ├─ useDashboardData.tsx
│  │  ├─ useDebounce.tsx
│  │  └─ useUser.tsx
│  ├─ lib/                                # Utilities
│  │  ├─ auth-utils.ts
│  │  ├─ clientCookie.ts
│  │  ├─ tokenHandlers.ts
│  │  └─ utils.ts
│  ├─ provider/
│  │  └─ ReduxProvider.tsx
│  ├─ redux/                              # State Management
│  │  ├─ api/
│  │  │  └─ baseApi.ts
│  │  ├─ features/
│  │  │  ├─ auth/
│  │  │  │  └─ authSlice.ts
│  │  │  ├─ category/
│  │  │  │  ├─ authApi.ts
│  │  │  │  └─ categoryApi.tsx
│  │  │  ├─ coupon/
│  │  │  │  ├─ couponApi.tsx
│  │  │  │  └─ couponSlice.tsx
│  │  │  ├─ orders/
│  │  │  │  └─ orderApi.tsx
│  │  │  ├─ productCompare/
│  │  │  │  └─ compareSlice.tsx
│  │  │  ├─ products/
│  │  │  │  ├─ productApi.ts
│  │  │  │  └─ productSlice.tsx
│  │  │  ├─ review/
│  │  │  │  └─ reviewsApi.tsx
│  │  │  └─ users/
│  │  │     └─ userApi.tsx
│  │  ├─ hooks.ts
│  │  └─ store.ts
│  ├─ routes/
│  │  └─ admin.vendor.route.               # Dashboard route management
│  ├─ types/
│  │  ├─ global.ts
│  │  ├─ modal.ts
│  │  └─ redux-persist.d.ts
│  ├─ utils/
│  │  ├─ dashboardHelpers.ts
│  │  ├─ loginService.ts
│  │  ├─ trimText.ts
│  │  └─ verifyToken.ts
│  ├─ views/
│  │  ├─ CartProductCard.tsx
│  │  ├─ CartView.tsx
│  │  ├─ DashboardOverviewView.tsx
│  │  ├─ FlashSaleView.tsx
│  │  ├─ ManageCategoriesView.tsx
│  │  └─ UpdateProductView.tsx
│  └─ proxy.ts                             # Middleware for protect route
├─ .env                                    # Environment variables
├─ .gitignore
├─ components.json
├─ eslint.config.mjs
├─ next-env.d.ts
├─ next.config.ts                          # Next.js configuration
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ postcss.config.mjs
├─ README.md
├─ tailwind.config.ts                       # Tailwind configuration
└─ tsconfig.json                            # TypeScript configuration


```

## 🎯 Key Features

### 1. Homepage
- Header section with search
- Shop by Categories with slider
- Latest Products
- Flash Sale for Products
- Recently Viewed Products for customers
- Why Choose EShop?
- Testimonials
- Subscription

### 2. Product Features
- Advanced search and filters
- Flash sales and discounts
- Real-time filtering
- Pagination
- Sort by price
- Range by price
- Category badges browsing
- Responsive design
- Related product suggestions
- Product reviews & ratings
- Flash sale products

### 3. Cart & Order

- Add to cart

- Checkout process

- Place orders

- Order history (Customer)

- Vendor order management

### 4. Coupon & Discount

- Apply coupon codes

- Percentage & Fixed discounts

- Coupon usage tracking

- Active / inactive coupons

### 5. Payment Integration
- Aamarpay payment method
- Use MasterCard and mobile banking for payment.
- Payment Success page
- Payment Failure page
- Payment history tracking


### 6.Product Comparison
- Side-by-side product comparison
- Compare prices, features, flash sale
- Same category based compare.

### 7. Review & Reply System

- Customer product reviews

- Vendor/Admin reply to reviews

### 8. Follow System

- Customers can follow vendors

- Vendor follower list
---

## 📄 Pages Overview

### Public Pages
- `/` - Homepage
- `/all-products` - Products search and filters
- `/flashSale` - All flash sale product
- `/blog` - Blog page
- `/login` - User login
- `/register` - User registration
- `/forgot-password` - Password reset

### Admin Pages
- `/dashboard/admin` - Admin dashboard overview 
- `/dashboard/admin/manage-user` - All user management
- `/dashboard/admin/manage-categories` - Category management for all product 
- `/dashboard/admin/manage-shops` - Manage all vendor data.

- `/dashboard/admin/transactions` - All payment history with order details
- `/dashboard/admin/all-reviews` - Checking all customer review and vendor reply.
- `/dashboard/admin/coupon` - coupon management for product
- `/dashboard/admin/admin-profile` - Admin profile management.
- `/dashboard/admin/password-settings` - Password changing for security.



### Vendor Pages
- `/dashboard/vendor` - Vendor dashboard overview 
- `/dashboard/vendor/manage-products` - Product management like create, update.
- `/dashboard/vendor/update-shop` - Vendor update their own shop
- `/dashboard/vendor/password-settings` - Password changing for security.
- `/dashboard/vendor/manage-orders` - Manage orders with payment and order details.
- `/dashboard/vendor/manage-reviews` - View all customer review for each product and reply those review.

### Customer Pages
- `/dashboard/customer` - Admin profile management.
- `/dashboard/customer/settings` - Password changing for security.
- `/dashboard/customer/my-orders` - View all order history and give review each product.
- `/dashboard/customer/followed-shop` - View all vendor shop which this customer follow . Also manage unfollow these vendor.


### Payment Result Pages
- `/checkout
- `/payment-success` - Payment successful
- `/payment-failed` - Payment failed
- `/payment-cancel` - Payment cancel


---


## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Configure environment variables
   - Deploy

3. **Environment Variables**
   - Add all variables from `.env`
   - Set `NEXT_PUBLIC_API_URL` to production backend URL
   - Set `JWT_ACCESS_SECRET` to match backend

4. **Custom Domain** (Optional)
   - Add custom domain in Vercel settings
   - Update DNS records

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start 
or
npm run dev
```

---

## 🔒 Authentication Flow

1. User logs in via `/login`
2. Backend returns JWT tokens
3. Tokens stored in HTTP-only cookies
4. Middleware (`proxy.ts`) validates tokens
5. Protected routes check user role
6. Expired tokens trigger re-login




---

For more information or support, please open an issue on the repository.