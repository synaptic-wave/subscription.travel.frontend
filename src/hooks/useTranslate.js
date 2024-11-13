import { gTagGRequestEvents } from "@/utils/ga";
import axios from "axios";
import { useQuery } from "react-query";

export default function useTranslate(text) {
  return useQuery(
    ["GET_TRANSLATE_OF", text],
    () =>
      axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        {},
        {
          params: {
            q: text,
            target: "ko",
            key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
          }
        }
      ),

    {
      enabled: !!text,
      onSettled: (res) => {
        gTagGRequestEvents(`TRANSLATION API: ${text}`);

        return res;
      }
    }
  );
}
