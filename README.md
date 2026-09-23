# Formularz dodawania produktu

Zadanie rekrutacyjne - wieloetapowy formularz dodawania produktu (React + Next.js).
Aplikacja pozwala dodać produkt przez 3-etapowy dialog, a następnie wyświetla go w tabeli na stronie głównej.

## Stack

- React + Next.js
- shadcn/ui
- TanStack Form
- Zod
- nuqs

## Uruchomienie

```bash
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

## Build produkcyjny

```bash
npm run build
npm start
```

## Funkcje

- 3-etapowy formularz w oknie dialogowym (przycisk „Dodaj produkt")
- Walidacja każdego kroku (Zod) - dalej tylko przy poprawnych danych
- Krok 2: automatyczne przeliczanie ceny netto / brutto / VAT
- Krok 3: dostępność, produkt limitowany, ilości min/max na koszyk
- Tabela produktów z przykładowymi produktami (dane mockowe)
- Paginacja synchronizowana z URL (nuqs)
- Zamknięcie dialogu resetuje formularz do kroku 1

https://www.figma.com/design/Uw6MPk2JMJcUpH4XY6X6UC/Zadanie-rekrutacyjne---WorkConnect?t=RKTfClGKlrpuRDsP-0