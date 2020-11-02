import api from "utils/api";
import moment from "moment";
import { API_VERSION } from "constants/index";

const preferencesApi = {
  getRounds: (deliveryhistoryid, type) => {
    return api.get(`/get_all_data_for_day?version=${API_VERSION}&deliveryhistoryid=${deliveryhistoryid}&type=${type}`);
  },
  getDatasets: () => {
    return api.get(`/get_open_days`);
  },
  updateDropDetail: async (drop, index, status, notes) => {
    const detail = drop.drop_details[index];
    const formData = new FormData();

    formData.append("icustomerid", drop.drop.icustomerid);
    formData.append("rounddeliveryid", drop.drop.rounddeliveryid);
    formData.append("publicationid", detail.publicationid);
    formData.append("qty_delivered", detail.nbrdeliveries);
    formData.append("deliverystatusid", status);
    formData.append("completed_datetime", moment.utc().format("YYYY-MM-DD HH:mm:ss"));
    formData.append("itemnotes", notes);

    return await api.post(`/update_drop_incomplete`, formData);
  },
  updateDropDelivered: async (endpoint, drop, coords, image, notes, status) => {
    const { latitude, longitude } = coords;
    const formData = new FormData();

    formData.append("icustomerid", drop.drop.icustomerid);
    formData.append("rounddeliveryid", drop.drop.rounddeliveryid);
    formData.append("deliverystatusid", status);
    formData.append("completed_datetime", moment.utc().format("YYYY-MM-DD HH:mm:ss"));
    formData.append("dropnotes", notes);
    formData.append("location", `${latitude},${longitude}`);

    return await api.post(endpoint, formData);
  },

  updateDropPicture: async (drop, image) => {
    const formData = new FormData();
    formData.append("icustomerid", drop.icustomerid);
    formData.append("rounddeliveryid", drop.rounddeliveryid);
    formData.append("picture", image.replace("data:image/jpg;base64,", ""));
    formData.append("taken_datetime", moment.utc().format("YYYY-MM-DD HH:mm:ss"));

    return await api.post("/update_drop_picture", formData).catch((err) => console.log(err));
  },
};

export default preferencesApi;
