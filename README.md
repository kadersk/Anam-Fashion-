# TailorPro - Tailor Management Application

A Progressive Web App (PWA) designed to help tailors manage their business efficiently.

## Features

### 📊 Dashboard
- Real-time statistics
- Customer count
- Total orders
- Revenue tracking
- Daily delivery count

### 👥 Customer Management
- Add new customers
- Search customers
- Edit customer details
- Delete customers
- Track order status

### 📦 Order Management
- Create new orders
- Set delivery dates
- Track order status (Pending, Cutting, Stitching, Trial, Ready, Delivered)
- Update amounts

### 📋 Measurements
- Store customer measurements
- Track:
  - Chest
  - Waist
  - Shoulder
  - Sleeve
  - Other custom measurements

### 🎨 Neck Sketch
- Draw custom neck sketches
- Color picker for different styles
- Adjustable brush size
- Undo functionality
- Save sketches locally
- Download as PNG

### 📸 Photos
- Upload customer photos
- Store multiple images
- Quick preview
- Gallery view

### 🎤 Voice Recording
- Record voice notes
- Store audio files
- Download recordings
- Delete unwanted recordings

### 📝 Notes
- Add detailed notes
- Auto-save functionality
- Store in browser
- Persistent storage

### 💰 Billing
- Set order amounts
- Track payment status
- Generate bills
- Create invoices

### 📄 PDF Invoice
- Generate professional invoices
- Download as PDF
- Include customer details
- Include order information
- Custom branding

### 🌙 Dark Mode
- Toggle dark mode
- Save preference
- Easy on eyes

## Technology Stack

- **HTML5** - Structure
- **CSS3** - Styling & Responsive Design
- **JavaScript** - Functionality
- **Service Worker** - Offline Support
- **LocalStorage** - Data Persistence
- **Canvas API** - Drawing features
- **Media API** - Audio recording
- **jsPDF** - PDF generation

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/kadersk/Anam-Fashion-.git
   cd Anam-Fashion-
   ```

2. Open `index.html` in a web browser

3. Or deploy to a web server for better PWA experience

## Usage

1. **Add Customer**: Go to "New Order" tab and fill in customer details
2. **Manage Orders**: Use "Customers" tab to view and edit orders
3. **Add Measurements**: Use "Measurements" tab to record customer sizes
4. **Draw Sketches**: Use "Neck Sketch" tab with drawing tools
5. **Upload Photos**: Use "Photos" tab to store customer images
6. **Voice Notes**: Use "Voice" tab to record audio notes
7. **Generate Invoice**: Click "Download PDF" on customer card

## Data Storage

All data is stored locally in the browser using:
- **LocalStorage** - For persistent customer data
- **IndexedDB** (potential) - For large files

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Progressive Web App (PWA)

This app can be installed as a PWA:

1. Open in Chrome/Edge
2. Click "Install" or "Add to home screen"
3. Use like a native app
4. Works offline

## Features Highlights

✅ Fully responsive design
✅ Offline functionality
✅ Dark mode support
✅ Local data persistence
✅ No database required
✅ No login needed
✅ Fast and lightweight
✅ Mobile-friendly
✅ Professional UI/UX

## Future Enhancements

- Cloud backup
- Multi-user support
- SMS notifications
- Email receipts
- Analytics dashboard
- Export reports
- Video tutorials

## License

MIT License - Feel free to use and modify

## Author

**ANAM FASHION**
- GitHub: [@kadersk](https://github.com/kadersk)

## Support

For issues, suggestions, or improvements:
- Open an issue on GitHub
- Contact via email

---

**Made with ❤️ for tailors**