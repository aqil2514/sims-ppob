import { Banner, Service } from "@/@types/data";
import { Balance, Profile } from "@/@types/user";
import { api } from "@/variables/api";
import axios from "axios";

export async function getDashboardResources(token: string) {
  try {
    const [profile, balance, services, banners] = await Promise.all([
      getProfile(token),
      getBalance(token),
      getServices(token),
      getBanner(),
    ]);

    const data = {
      profile,
      balance,
      services,
      banners,
    };

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTopupResource(token: string) {
  try {
    const [profile, balance] = await Promise.all([
      getProfile(token),
      getBalance(token),
    ]);

    const data = {
      profile,
      balance,
    };

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getProfile(token: string) {
  try {
    const { data } = await axios.get(`${api}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data as Profile;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getBalance(token: string) {
  try {
    const { data } = await axios.get(`${api}/balance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data as Balance;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getServices(token: string) {
  try {
    const { data } = await axios.get(`${api}/services`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data as Service[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getBanner() {
  try {
    const { data } = await axios.get(`${api}/banner`);

    return data.data as Banner[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
