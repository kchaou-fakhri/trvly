import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ADHANService } from "@services/remote/adhan/AdhanServices";
import { AdhanResult } from "@model/entity/adhan/AdhanResult";
import { AdhanState } from "./State";

// Get the device timezone
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;


// Initial state
const initialState: AdhanState = {
    data: undefined,
    loading: false,
    error: undefined,
};

export const fetchAdhanTime = createAsyncThunk<AdhanResult, void, { rejectValue: string }>(
    "adhan/fetchAdhanTime",
    async (_, { rejectWithValue }) => {
        try {
            const response = await ADHANService.getPrayerTime(timeZone);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// **Create Redux slice**
export const adhanSlice = createSlice({
    name: "adhan",
    initialState,
    reducers: {}, // No synchronous reducers needed for now
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdhanTime.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchAdhanTime.fulfilled, (state, action: PayloadAction<AdhanResult>) => {
                state.data = action.payload;
                state.loading = false;
                state.error = undefined;
            })
            .addCase(fetchAdhanTime.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default adhanSlice.reducer;
