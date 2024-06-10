"use client";
import React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

interface Props {
  data: {
    name: string;
    indiceUV: number;
    presion: number;
    temperatura: number;
  }[];
}

export const HourGraph = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#91c4f7" stopOpacity={0.8} />
            <stop offset="95%" stopColor="  #91c4f7" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f7d8a6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f7d8a6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorTmp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f76e6e" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f76e6e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <Tooltip
          contentStyle={{
            color: "hsl(var(--popover-primary))",
            backgroundColor: "hsl(var(--popover))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)"
          }}
        />
        <Area type="monotone" dataKey="temperatura" stroke="#f76e6e" fillOpacity={1} fill="url(#colorTmp)" />
        <Area type="monotone" dataKey="presion" stroke="#f7d8a6" fillOpacity={1} fill="url(#colorPv)" />
        <Area type="monotone" dataKey="indiceUV" stroke="#91c4f7" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
