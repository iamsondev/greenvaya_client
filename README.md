# 🌿 GreenVaya Client

[![Next.js](https://img.shields.io/badge/Next.js-15/16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-0.8-black?style=flat-square&logo=shadcnui)](https://ui.shadcn.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

**GreenVaya** is a modern, eco-conscious idea-sharing and funding platform. It empowers users to share innovative green ideas, manage their environmental projects, and receive funding through a secure and intuitive interface.

---

## ✨ Key Features

- **🔐 Robust Authentication**: Secure login and signup with JWT-based session management.
- **📊 Interactive Dashboards**: Custom views for both **Admins** and **Members** to track progress and manage submissions.
- **💡 Idea Management**: Full CRUD operations for ideas—create, view, edit, and delete environmental projects.
- **💳 Secure Payments**: Integrated payment gateway (SSLCommerz) for funding and purchases.
- **🖼️ Media Handling**: High-performance image management via **Cloudinary**.
- **🎨 Modern UI**: Built with **Tailwind CSS 4** and **shadcn/ui** for a premium, responsive user experience.
- **🌗 Theme Support**: Seamless switching between light and dark modes.

---

## 🚀 Tech Stack

- **Core**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS 4, Vanilla CSS (for custom animations)
- **UI Components**: shadcn/ui, Radix UI, Lucide React
- **State Management**: Zustand
- **Form Handling**: React Hook Form, Zod (Validation)
- **Utilities**: Axios, clsx, tailwind-merge, Sonner (Toasts)
- **Authentication**: jwt-decode, Lucide React

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js**: v18.x or higher
- **npm** or **pnpm**

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/iamsondev/greenvaya_client.git
    cd greenvaya_client
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` or `.env.local` file in the root directory and add the following:
    ```env
    NEXT_PUBLIC_API_URL=https://greenvaya-backend.vercel.app/api/v1
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    # or
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📁 Project Structure

```text
├── app/                  # Next.js App Router (Public & Dashboard routes)
├── components/           # Reusable UI components (shadcn & custom)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions (Axios instance, etc.)
├── public/               # Static assets
├── store/                # Zustand state stores
├── types/                # TypeScript type definitions (if applicable)
└── ...
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📝 License

This project is licensed under the MIT License.
