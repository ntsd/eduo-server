/**
 * Created by Jiravat on 18/2/2560.
 */
'use strict';

const SocialType = {
    GOOGLE: 'google-oauth2',
    FACEBOOK: 'facebook',
};

const Role = {
    STUDENT: 'student',
    TEACHER: 'teacher',
    ADMIN: 'admin',
};

const Days ={
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
    Sunday: "Sunday"
};

const Levels = {
    elementary : 1,
    lowerSecondary : 2,
    upperSecondary : 3,
    higherEducation: 4,
    other: 5
};

module.exports = {
    SocialType,
    Role,
    Days,
    Levels
};
