export enum ParkingSpotKinds {
    REGULAR_PARKING_KIND = "REGULAR_PARKING_KIND",
    INCLUSIVE_PARKING_KIND = "INCLUSIVE_PARKING_KIND",
    SPECIAL_PARKING_KIND = "SPECIAL_PARKING_KIND",
}

export enum ParkingSpotStatus {
    UndefinedParkingLotStatus = "UNDEFINED_PARKING_LOT_STATUS",
    FreeParkingLotStatus = "FREE_PARKING_LOT_STATUS",
    BusyParkingLotStatus = "BUSY_PARKING_LOT_STATUS",
    MineParkingLotStatus = "MINE_PARKING_LOT_STATUS",
    ExpiredParkingLotStatus = "EXPIRED_PARKING_LOT_STATUS",
}

export enum ParkingSpotType {
    UndefinedParkingType = "UNDEFINED_PARKING_TYPE",

    // OwnedParkingType владеет кто-то другой - замок
    OwnedParkingType = "OWNED_PARKING_TYPE",

    // LongTermRentByMeParkingType чужое место, арендую долгосрочно - мешок денег
    LongTermRentByMeParkingType = "LONG_TERM_RENT_BY_ME_PARKING_TYPE",

    // ShortTermRentByMeParkingType чужое место, арендую краткосрочно - мешок денег, часы
    ShortTermRentByMeParkingType = "SHORT_TERM_RENT_BY_ME_PARKING_TYPE",

    // LongTermRentByOtherParkingType мое место, сняли долгосрочно (в текущий момент) - P
    LongTermRentByOtherParkingType = "LONG_TERM_RENT_BY_OTHER_PARKING_TYPE",

    // ShortTermRentByOtherParkingType мое место, сняли краткосрочно (в текущий момент) - P, часы
    ShortTermRentByOtherParkingType = "SHORT_TERM_RENT_BY_OTHER_PARKING_TYPE"
}



// enum ParkingKind {
//     UNDEFINED_PARKING_KIND = 0;
// REGULAR_PARKING_KIND = 1;
// SPECIAL_PARKING_KIND = 2;
// INCLUSIVE_PARKING_KIND = 3;
// }
//
// enum ParkingLotStatus {
//     UNDEFINED_PARKING_LOT_STATUS = 0;
// FREE_PARKING_LOT_STATUS = 1;
// BUSY_PARKING_LOT_STATUS = 2;
// MINE_PARKING_LOT_STATUS = 3;
// EXPIRED_PARKING_LOT_STATUS = 4;
// }
//
// enum ParkingType {
//     UNDEFINED_PARKING_TYPE = 0;
// OWNED_PARKING_TYPE = 1;
// LONG_TERM_RENT_BY_ME_PARKING_TYPE = 2;
// SHORT_TERM_RENT_BY_ME_PARKING_TYPE = 3;
// LONG_TERM_RENT_BY_OTHER_PARKING_TYPE = 4;
// SHORT_TERM_RENT_BY_OTHER_PARKING_TYPE = 5;
// }