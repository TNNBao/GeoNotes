# GeoNotes App - Trần Nguyễn Ngọc Bảo - 22GIT

Ứng dụng ghi chú theo vị trí (Geo-Notes) xây dựng bằng **React + Capacitor + Leaflet**.

## 🚀 Demo

- 📱 Android APK: [Tải tại đây](https://drive.google.com/drive/folders/1wWiWDSyhKXpxb9pWT51F1kgeumms-zNV)

## ✨ Tính năng

- Ghi chú (note) kèm tọa độ GPS hiện tại.
- Hiển thị tất cả các ghi chú trên bản đồ (Leaflet).
- Click vào note để phóng tới vị trí trên bản đồ.
- Mở Google Maps/Apple Maps để dẫn đường.
- Xóa ghi chú trực tiếp từ danh sách.

## 🛠️ Công nghệ

- **Frontend**: React + Vite
- **Mobile**: Capacitor
- **Map**: Leaflet + OpenStreetMap
- **Plugin**: `@capacitor/geolocation`

## 📦 Cài đặt & chạy

1. Clone project từ GitHub

```bash
git clone https://github.com/TNNBao/GeoNotes.git
cd GeoNotes
```

2. Cài đặt dependencies

```bash
npm install
```

3. Build và Sync

```bash
npm run build
npm cap sync
```

4. Chạy thử

- Web: `npm run dev`
- Android: `npx cap open android`
- iOS: `npx cap open ios`
