# ♡ Haar Hartklop — Webwerf

'n Produksie-gereed webwerf vir **Haar Hartklop**, 'n Christelike vrouebediening wat Bybelstudies, susterskap en bemoediging bied. Gebou met Next.js, TypeScript, Tailwind CSS, Prisma en PostgreSQL.

## 🌟 Kenmerke

- **Publieke Bladsye**: Tuis, Virtuele Bybelstudie, Gebeurtenisse, Verlossing, Vennoot, Winkel, Kontak
- **Admin Paneel**: Authentikasie, bestuur van tuisblad, bybelstudies, gebeurtenisse, produkte, vorms en instellings
- **Heldede Skyfies**: Roteerbare fotos met teks-oorvleueling
- **Getuienis Karrousel**: Skuif-ervaring met pyle
- **Bybelstudie Registrasie**: Met betaaltoegangbeheer
- **Vorms**: Nuusbrief, Bybelstudie, Verlossing, Kontak — met CSV uitvoer
- **Winkel**: Produkrooster met kategorieë, pryse, eksterne betaalskakels
- **Volle Afrikaans**: Alle inhoud en UI in Afrikaans
- **Mobiel-responsief**: Werk op alle skermgroottes

## 🛠️ Tegnologie Stapel

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Databasis**: MariaDB / MySQL (via Docker)
- **Authentikasie**: JWT via `jose`, bcryptjs wagwoord hashing
- **Validering**: Zod

## 🚀 Vinnige Begin

### Vereistes

- Node.js 18+
- Docker Desktop

### 1. Installeer Afhanklikhede

```bash
npm install
```

### 2. Begin die Databasis (Docker)

```bash
docker compose up -d
```

Die MariaDB databasis sal beskikbaar wees op `localhost:3306`.

### 3. Stel Prisma Op

```bash
npx prisma generate
npx prisma db push
```

### 4. Saai die Databasis

```bash
npm run db:seed
```

Dit skep:
- Admin gebruiker: `admin@haarhartklop.co.za` / `hartklop2024!`
- Voorbeeld inhoud vir alle afdelings

### 5. Begin die Ontwikkelingsbediener

```bash
npm run dev
```

Besoek [http://localhost:3000](http://localhost:3000).

### 6. Admin Toegang

Besoek [http://localhost:3000/admin/login](http://localhost:3000/admin/login) en meld aan met:
- **E-pos**: `admin@haarhartklop.co.za`
- **Wagwoord**: `hartklop2024!`

## 📁 Projek Struktuur

```
haarhartklop/
├── docker-compose.yml       # PostgreSQL databasis
├── prisma/
│   ├── schema.prisma        # Data model
│   └── seed.ts              # Saai data
├── src/
│   ├── app/                 # Next.js App Router bladsye
│   │   ├── page.tsx         # Tuisblad
│   │   ├── virtuele-bybelstudie/
│   │   ├── gebeurtenisse/
│   │   ├── verlossing/
│   │   ├── vennoot/
│   │   ├── winkel/
│   │   ├── kontak/
│   │   ├── admin/           # Admin paneel
│   │   └── api/             # API roetes
│   ├── components/          # Herbruikbare komponente
│   └── lib/                 # Hulpprogramme (prisma, auth, utils)
├── public/
│   └── images/              # Statiese beelde (plaas hier)
└── markdown/                # Projek dokumentasie
```

## 🎨 Ontwerp Stelsel

### Kleure

| Naam | Hex |
|------|-----|
| Diep Rooi | `#8F1717` |
| Wyn/Pers | `#58223B` |
| Roos | `#D7A893` |
| Sagte Blos | `#FFF8F4` |
| Warm Room | `#F4E6DD` |
| Ligblou | `#BFD6DE` |
| Olyf | `#7A7B45` |
| Ink | `#271718` |

### Tipografie

- **Opskrifte**: Playfair Display
- **Liggaam**: Montserrat

## 🔒 Omgewingsveranderlikes

Kopieer `.env.example` na `.env` en stel:

```env
DATABASE_URL="mysql://haarhartklop:haarhartklop@localhost:3306/haarhartklop"
JWT_SECRET="jou-unieke-geheim"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## 📦 Produksie Bou

```bash
npm run build
npm start
```

Vir produksie-ontplooiing:
1. Stel 'n MariaDB/MySQL databasis op (Supabase, PlanetScale, ens.)
2. Dateer `DATABASE_URL` op
3. Stel 'n sterker `JWT_SECRET`
4. Ontplooi na Vercel / Netlify

## 📊 Admin Kenmerke

- **Tuisblad Bestuur**: Heldede skyfies, stigter brief, getuienisse
- **Bybelstudies**: Skep, wysig, stel kapasiteit, privaat Zoom skakels
- **Gebeurtenisse**: Bestuur geleenthede met datums, liggings, statusse
- **Winkel**: Produkte met kategorieë, pryse, eksterne betaalskakels
- **Vorms**: Kyk en merk kontak-, verlossing-, en bybelstudie-inskrywings
- **Instellings**: Werf naam, kleure, sosiale skakels, logo

## 🔐 Sekuriteit

- Wagwoorde word gehash met bcryptjs
- JWT tokens vir admin sessies (httpOnly cookies)
- Privaat Zoom/skakels word nooit aan publiek blootgestel nie
- Omgewingsveranderlikes vir alle geheime

## 📝 Lisensie

Alle regte voorbehou. Hierdie kode is gebou vir Haar Hartklop.
