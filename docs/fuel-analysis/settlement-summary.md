# Fuel files quick analysis

## 20210319-Settlement-JND.csv

- **Rows scanned**: 102 operational entries after skipping headers/totals.
- **Total miles across the set**: 13,446 miles.
- **Average “Fuel” rate column**: 46.53 (per recorded leg) — consistent at ~1.9$/mile when combined with VMR/Mileage column data.
- **Driver distribution**: only 4 unique `DRIVER #1` IDs appear; top three are `7991241` (30 trips), `7984982` (10 trips), `7288599` (8 trips), which should align with the K-PIs and lane assignments you want to monitor.
- **Observation**: the data is already normalized per trip (VMR rate + premium + fuel / total rate) which makes it easy to compare against your Neon/Postgres KPIs once the CSV ingest is wired up.

## 2024_101_20240712_L101_20240712_V0014634_C7683507.pdf

- **Settlement week**: 07/06/2024 – 07/12/2024 for Contract ID `C7683507` (JND Trucking Inc, Paul Knopp owner).
- **Payout summary**:
  - Linehaul miles: `6,962` / Fuel amount `$14,134.03` / total `14,700.53`.
  - Spot miles: additional `405` / Fuel amount `$121.25` / additional charges culminating in `$1,577.45`.
  - **Total gross** reported: `$16,277.98`.
- **Driver/vehicle splits**: Row data lists `VEHICLE` numbers `161404`, `161528`, `167682`, and `294610`, each with repeated lanes that can be mapped to the Preferred Network and Chrome Load Watcher sections.
- **Notes section**: PDF also includes contract metadata (station 00277 Durham, entity V0014634). Use this to tag the owner dashboard timeline and serve as reference for weekly justification emails.

## What’s next

1. Route this summary into the owner dashboard through the CSV ingestion stubs we added (`/api/admin/upload`) so the same KPIs auto-refresh each Monday.
2. Normalize the PDF’s totals (linehaul vs. spot) with the CSV data and highlight any lane-specific savings or deviations in the “Missed Discount Analyzer” area of the admin page.
3. Keep this file as the single source for referencing historical fuel doc findings — open it directly in the repo at `docs/fuel-analysis/settlement-summary.md` whenever you need to recall these totals.
