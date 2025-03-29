// src/constants/parkingAngles.ts

export enum ParkingAngle {
    Angle0 = 0,
    Angle30 = 30,
    Angle45 = 45,
    Angle60 = 60,
    Angle90 = 90,
    Angle120 = 120,
    Angle135 = 135,
    Angle150 = 150,
    Angle180 = 180,
    Angle210 = 210,
    Angle225 = 225,
    Angle240 = 240,
    Angle270 = 270,
    Angle300 = 300,
    Angle315 = 315,
    Angle330 = 330,
}

const GAP_GROUPS: Record<number, number[]> = {
    1: [ParkingAngle.Angle0, ParkingAngle.Angle180],
    15: [ParkingAngle.Angle30, ParkingAngle.Angle210, ParkingAngle.Angle150, ParkingAngle.Angle330],
    30: [ParkingAngle.Angle45, ParkingAngle.Angle225, ParkingAngle.Angle135, ParkingAngle.Angle315],
    50: [ParkingAngle.Angle90, ParkingAngle.Angle270],
    60: [ParkingAngle.Angle60, ParkingAngle.Angle240, ParkingAngle.Angle120, ParkingAngle.Angle300],
};

export const getGapByAngle = (angle: ParkingAngle): number => {
    for (const [gap, angles] of Object.entries(GAP_GROUPS)) {
        if (angles.includes(angle)) {
            return Number(gap);
        }
    }
    return 0;
};