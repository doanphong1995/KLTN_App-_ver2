!function () {
    "use strict";
    angular.module("ion-datetime-picker", ["ionic"]).directive("ionDatetimePicker", function () {
        return {
            restrict: "AE",
            require: "ngModel",
            scope: {
                modelDate: "=ngModel",
                title: "=?",
                subTitle: "=?",
                buttonOk: "=?",
                buttonCancel: "=?",
                monthStep: "=?",
                hourStep: "=?",
                minuteStep: "=?",
                secondStep: "=?",
                onlyValid: "=?"
            },
            controller: ["$scope", "$ionicPopup", "$ionicPickerI18n", "$timeout", function (e, t, n, i) {
                function a(e, t) {
                    t = t || 0, 0 !== t && e.setDate(e.getDate() + t), l.year = e.getFullYear(), l.month = e.getMonth(), l.day = e.getDate(), l.hour = e.getHours(), l.minute = e.getMinutes(), l.second = e.getSeconds(), l.date = e
                }

                function o() {
                    var t = new Date(e.year, e.month, e.day, e.hour, e.minute, e.second);
                    e.isEnabled(t.getDate(), !0) ? a(t) : (e.year = l.year, e.month = l.month, e.day = l.day, e.hour = l.hour, e.minute = l.minute, e.second = l.second)
                }

                function c(e) {
                    var t = new Date(e), n = isNaN(t.getTime());
                    return n && (t = new Date), t.setHours(0, 0, 0, 0, 0), t
                }

                e.i18n = n, e.bind = {}, e.rows = [0, 1, 2, 3, 4, 5], e.cols = [1, 2, 3, 4, 5, 6, 7], e.weekdays = [0, 1, 2, 3, 4, 5, 6];
                var l = {
                    year: e.year,
                    month: e.month,
                    day: e.day,
                    hour: e.hour,
                    minute: e.minute,
                    second: e.second,
                    date: new Date,
                    getDateWithoutTime: function () {
                        var e = new Date(this.date);
                        return e.setHours(0, 0, 0, 0, 0), e
                    }
                };
                e.showPopup = function () {
                    t.show({
                        templateUrl: "../picker-popup.html",
                        title: e.title || "Pick " + (e.dateEnabled ? "a date" : "") + (e.dateEnabled && e.timeEnabled ? " and " : "") + (e.timeEnabled ? "a time" : ""),
                        subTitle: e.subTitle || "",
                        scope: e,
                        cssClass: "ion-datetime-picker-popup",
                        buttons: [{
                            text: e.buttonOk || e.i18n.ok, type: e.i18n.okClass, onTap: function () {
                                e.commit()
                            }
                        }, {
                            text: e.buttonCancel || e.i18n.cancel, type: e.i18n.cancelClass, onTap: function () {
                                i(function () {
                                    e.processModel()
                                }, 200)
                            }
                        }]
                    })
                }, e.prepare = function () {
                    e.mondayFirst && e.weekdays.push(e.weekdays.shift())
                }, e.processModel = function () {
                    var t = e.modelDate instanceof Date ? e.modelDate : new Date;
                    e.year = e.dateEnabled ? t.getFullYear() : 0, e.month = e.dateEnabled ? t.getMonth() : 0, e.day = e.dateEnabled ? t.getDate() : 0, e.hour = e.timeEnabled ? t.getHours() : 0, e.minute = e.timeEnabled ? t.getMinutes() : 0, e.second = e.secondsEnabled ? t.getSeconds() : 0, s()
                };
                var s = function () {
                    o();
                    var t = new Date(e.year, e.month, e.day, e.hour, e.minute, e.second);
                    e.dateEnabled && (e.year = t.getFullYear(), e.month = t.getMonth(), e.day = t.getDate(), e.bind.year = e.year, e.bind.month = e.month, e.firstDay = new Date(e.year, e.month, 1).getDay(), e.mondayFirst && (e.firstDay = (e.firstDay || 7) - 1), e.daysInMonth = d(e.year, e.month)), e.timeEnabled && (e.hour = t.getHours(), e.minute = t.getMinutes(), e.second = t.getSeconds(), e.meridiem = e.hour < 12 ? "AM" : "PM", e.bind.hour = e.meridiemEnabled ? (e.hour % 12 || 12).toString() : e.hour.toString(), e.bind.minute = (e.minute < 10 ? "0" : "") + e.minute.toString(), e.bind.second = (e.second < 10 ? "0" : "") + e.second.toString(), e.bind.meridiem = e.meridiem)
                }, d = function (e, t) {
                    return new Date(e, t + 1, 0).getDate()
                };
                e.changeBy = function (t, n) {
                    if (+t) {
                        if (("hour" === n || "minute" === n) && t === -1) {
                            var i = new Date(e.year, e.month, e.day, e.hour - 1, e.minute);
                            0 !== e.minute && "hour" !== n || e.hour !== i.getHours() || e.hour--
                        }
                        e[n] += +t, "month" !== n && "year" !== n || (e.day = Math.min(e.day, d(e.year, e.month))), s()
                    }
                }, e.change = function (t) {
                    var n = e.bind[t];
                    n && "meridiem" === t ? (n = n.toUpperCase(), "AM" === n && "PM" === e.meridiem ? e.hour -= 12 : "PM" === n && "AM" === e.meridiem && (e.hour += 12), s()) : (+n || 0 === +n) && (e[t] = +n, "month" !== t && "year" !== t || (e.day = Math.min(e.day, d(e.year, e.month))), s())
                }, e.changeDay = function (t) {
                    e.day = t, s()
                }, e.isEnabled = function (t, n) {
                    if (!e.onlyValid) return !0;
                    var i = new Date(e.year, e.month, t), o = e.onlyValid;
                    o instanceof Array || (o = [o]);
                    for (var s = !0, d = 0; d < o.length; d++) {
                        var r = o[d];
                        if (r.after) {
                            var u = c(r.after);
                            r.inclusive ? (s = i >= u, !s && n && a(u, 0)) : (s = i > u, !s && n && a(u, 1))
                        } else if (r.before) {
                            var m = c(r.before);
                            r.inclusive ? (s = i <= m, !s && n && a(m, 0)) : (s = i < m, !s && n && a(m, -1))
                        } else if (r.between) {
                            var b = c(r.between.initial), h = c(r.between["final"]);
                            r.inclusive ? (s = i >= b && i <= h, !s && n && (i < b && a(b, 0), i > h && a(h, 0))) : (s = i > b && i < h, !s && n && (i <= b && a(b, 1), i >= h && a(h, -1)))
                        } else if (r.outside) {
                            var b = c(r.outside.initial), h = c(r.outside["final"]);
                            if (r.inclusive) {
                                if (s = i <= b || i >= h, !s && n) {
                                    var g = l.getDateWithoutTime();
                                    g <= b && a(h, 0), g >= h && a(b, 0)
                                }
                            } else if (s = i < b || i > h, !s && n) {
                                var g = l.getDateWithoutTime();
                                g < b && a(h, 1), g > h && a(b, -1)
                            }
                        }
                        if (!s) break
                    }
                    return s
                }, e.changed = function () {
                    s()
                }, e.dateEnabled && e.$watch(function () {
                    return (new Date).getDate()
                }, function () {
                    var t = new Date;
                    e.today = { day: t.getDate(), month: t.getMonth(), year: t.getFullYear() }
                })
            }],
            link: function (e, t, n, i) {
                e.dateEnabled = "date" in n && "false" !== n.date, e.timeEnabled = "time" in n && "false" !== n.time, e.dateEnabled === !1 && e.timeEnabled === !1 && (e.dateEnabled = e.timeEnabled = !0), e.mondayFirst = "mondayFirst" in n && "false" !== n.mondayFirst, e.secondsEnabled = e.timeEnabled && "seconds" in n && "false" !== n.seconds, e.meridiemEnabled = e.timeEnabled && "amPm" in n && "false" !== n.amPm, e.monthStep = +e.monthStep || 1, e.hourStep = +e.hourStep || 1, e.minuteStep = +e.minuteStep || 1, e.secondStep = +e.secondStep || 1, e.prepare(), i.$render = function () {
                    e.modelDate = i.$viewValue, e.processModel()
                }, e.commit = function () {
                    e.modelDate = new Date(e.year, e.month, e.day, e.hour, e.minute, e.second), i.$setViewValue(e.modelDate)
                }, t.on("click", e.showPopup)
            }
        }
    }), angular.module("ion-datetime-picker").factory("$ionicPickerI18n", ["$window", function (e) {
        return {
            ok: "OK",
            cancel: "Cancel",
            okClass: "button-positive",
            cancelClass: "button-stable",
            arrowButtonClass: "button-positive",
            weekdays: e.moment ? e.moment.weekdaysMin() : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            months: e.moment ? e.moment.months() : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        }
    }]), angular.module("ion-datetime-picker").run(["$templateCache", function (e) {
        e.put("../picker-popup.html", '<div class="ion-datetime-picker"><div ng-if-start="dateEnabled" class="row month-year"><div class="col col-10 left-arrow"><button type="button" class="button button-small button-clear icon ion-chevron-left" ng-class="i18n.arrowButtonClass" ng-click="changeBy(-monthStep, \'month\')"></button></div><label class="col col-50 month-input"><div class="item item-input item-select"><select ng-model="bind.month" ng-options="i18n.months.indexOf(month) as month for month in i18n.months" ng-change="change(\'month\')"></select></div></label> <label class="col year-input"><div class="item item-input"><div><input type="number" ng-model="bind.year" min="1900" max="2999" ng-change="change(\'year\')" ng-blur="changed()" required=""></div></div></label><div class="col col-10 right-arrow"><button type="button" class="button button-small button-clear icon ion-chevron-right" ng-class="i18n.arrowButtonClass" ng-click="changeBy(+monthStep, \'month\')"></button></div></div><div class="row calendar weekdays"><div class="col" ng-repeat="weekday in weekdays"><div class="weekday">{{i18n.weekdays[weekday]}}</div></div></div><div ng-if-end="" class="row calendar days" ng-repeat="y in rows"><div class="col" ng-repeat="x in cols"><div ng-show="(cellDay = y * 7 + x - firstDay) > 0 && cellDay <= daysInMonth" ng-click="changeDay(cellDay)" class="day" ng-class="{ \'disabled\': !isEnabled(cellDay), \'selected\': cellDay === day, \'today\': cellDay === today.day && month === today.month && year === today.year }">{{cellDay}}</div></div></div><div ng-if-start="timeEnabled" class="row time-buttons"><div class="col"></div><div class="col-20"><button type="button" class="button button-clear icon ion-chevron-up" ng-class="i18n.arrowButtonClass" ng-click="changeBy(+hourStep, \'hour\')"></button></div><div class="col"></div><div class="col-20"><button type="button" class="button button-clear icon ion-chevron-up" ng-class="i18n.arrowButtonClass" ng-click="changeBy(+minuteStep, \'minute\')"></button></div><div ng-if-start="secondsEnabled" class="col"></div><div ng-if-end="" class="col-20"><button type="button" class="button button-clear icon ion-chevron-up" ng-class="i18n.arrowButtonClass" ng-click="changeBy(+secondStep, \'second\')"></button></div><div ng-if-start="meridiemEnabled" class="col"></div><div ng-if-end="" class="col-20"><button type="button" class="button button-clear icon ion-chevron-up" ng-class="i18n.arrowButtonClass" ng-click="changeBy(+12, \'hour\')"></button></div><div class="col"></div></div><div class="row time"><div class="col"></div><label class="col col-20"><div class="item item-input"><div><input type="text" ng-model="bind.hour" pattern="0?([01]?[0-9]|2[0-3])" ng-change="change(\'hour\')" ng-blur="changed()" required=""></div></div></label><div class="col colon">:</div><label class="col col-20"><div class="item item-input"><div><input type="text" ng-model="bind.minute" pattern="0?[0-5]?[0-9]" ng-change="change(\'minute\')" ng-blur="changed()" required=""></div></div></label><div ng-if-start="secondsEnabled" class="col colon">:</div><label ng-if-end="" class="col col-20"><div class="item item-input"><div><input type="text" ng-model="bind.second" pattern="0?[0-5]?[0-9]" ng-change="change(\'second\')" ng-blur="changed()" required=""></div></div></label><div ng-if-start="meridiemEnabled" class="col"></div><label ng-if-end="" class="col col-20"><div class="item item-input"><div><input type="text" ng-model="bind.meridiem" pattern="[aApP][mM]" ng-change="change(\'meridiem\')" ng-blur="changed()" required=""></div></div></label><div class="col"></div></div><div ng-if-end="" class="row time-buttons"><div class="col"></div><div class="col-20"><button type="button" class="button button-clear icon ion-chevron-down" ng-class="i18n.arrowButtonClass" ng-click="changeBy(-hourStep, \'hour\')"></button></div><div class="col"></div><div class="col-20"><button type="button" class="button button-clear icon ion-chevron-down" ng-class="i18n.arrowButtonClass" ng-click="changeBy(-minuteStep, \'minute\')"></button></div><div ng-if-start="secondsEnabled" class="col"></div><div ng-if-end="" class="col-20"><button type="button" class="button button-clear icon ion-chevron-down" ng-class="i18n.arrowButtonClass" ng-click="changeBy(-secondStep, \'second\')"></button></div><div ng-if-start="meridiemEnabled" class="col"></div><div ng-if-end="" class="col-20"><button type="button" class="button button-clear icon ion-chevron-down" ng-class="i18n.arrowButtonClass" ng-click="changeBy(-12, \'hour\')"></button></div><div class="col"></div></div></div>')
    }])
}();