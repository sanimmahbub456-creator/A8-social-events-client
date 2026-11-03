"use client";

import { axiosSecure } from "@/lib/axiosSecure";

// Thin hook wrapper so components import a hook (consistent with useAuth)
// rather than the raw axios instance.
const useAxiosSecure = () => axiosSecure;

export default useAxiosSecure;
