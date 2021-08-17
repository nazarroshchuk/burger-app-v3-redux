export default class jsonUtils {
    static tryParse(string) {
        if (!string) {
            return null;
        }

        let json;
        try {
            json = JSON.parse(string);
        } catch { }

        if (json && typeof json === "object") {
            return json;
        }

        return null;
    }

    static parse(json) {
        try {
            return typeof json === 'object' ? json : JSON.parse(json);
        } catch (e) {
            return null;
        }
    }
}
