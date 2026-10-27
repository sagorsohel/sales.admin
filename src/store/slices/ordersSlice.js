import { createSlice } from "@reduxjs/toolkit";

const initialOrders = [
  {
    id: "ORD-9821",
    customer: "Nexus Digital Corp",
    email: "billing@nexuscorp.io",
    product: "Enterprise Cloud Suite Pro",
    amount: 598,
    status: "Completed",
    date: "2026-10-27 10:14",
  },
  {
    id: "ORD-9822",
    customer: "Vanguard Systems",
    email: "procurement@vanguard.com",
    product: "AI Analytics Intelligence Platform",
    amount: 499,
    status: "Processing",
    date: "2026-10-27 08:35",
  },
  {
    id: "ORD-9823",
    customer: "Apex Fintech Ltd",
    email: "devops@apexfin.com",
    product: "Shield Cyber Security Mesh",
    amount: 547,
    status: "Completed",
    date: "2026-10-26 17:50",
  },
  {
    id: "ORD-9824",
    customer: "Horizon Media Labs",
    email: "admin@horizonmedia.net",
    product: "Global Edge Content Delivery",
    amount: 267,
    status: "Pending",
    date: "2026-10-26 14:10",
  },
  {
    id: "ORD-9825",
    customer: "Starlight SaaS Inc",
    email: "accounts@starlight.co",
    product: "Omnichannel Customer Hub",
    amount: 249,
    status: "Completed",
    date: "2026-10-25 11:22",
  },
];

export const ordersSlice = createSlice({
  name: "adminOrders",
  initialState: {
    items: initialOrders,
    filterStatus: "All",
  },
  reducers: {
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.items.find((o) => o.id === id);
      if (order) {
        order.status = status;
      }
    },
  },
});

export const { setFilterStatus, updateOrderStatus } = ordersSlice.actions;

export default ordersSlice.reducer;
