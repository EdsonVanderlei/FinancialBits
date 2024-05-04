export abstract class NumberUtils {
	static min(value: number, min: number, exclusive: boolean = false) {
		if (exclusive) return value > min;
		return value >= min;
	}
	static max(value: number, max: number, exclusive: boolean = false) {
		if (exclusive) return value < max;
		return value <= max;
	}
	static minMax(value: number, min: number, max: number, exclusive: boolean = false) {
		if (!NumberUtils.min(value, min, exclusive)) return -1;
		if (!NumberUtils.max(value, max, exclusive)) return 1;
		return 0;
	}
}
