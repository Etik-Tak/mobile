'use strict';var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var collection_1 = require('angular2/src/facade/collection');
var constants_1 = require('./constants');
var pipe_lifecycle_reflector_1 = require('./pipe_lifecycle_reflector');
var binding_record_1 = require('./binding_record');
var directive_record_1 = require('./directive_record');
/**
 * Indicates that the result of a {@link PipeMetadata} transformation has changed even though the
 * reference
 * has not changed.
 *
 * The wrapped value will be unwrapped by change detection, and the unwrapped value will be stored.
 *
 * Example:
 *
 * ```
 * if (this._latestValue === this._latestReturnedValue) {
 *    return this._latestReturnedValue;
 *  } else {
 *    this._latestReturnedValue = this._latestValue;
 *    return WrappedValue.wrap(this._latestValue); // this will force update
 *  }
 * ```
 */
var WrappedValue = (function () {
    function WrappedValue(wrapped) {
        this.wrapped = wrapped;
    }
    WrappedValue.wrap = function (value) {
        var w = _wrappedValues[_wrappedIndex++ % 5];
        w.wrapped = value;
        return w;
    };
    return WrappedValue;
})();
exports.WrappedValue = WrappedValue;
var _wrappedValues = [
    new WrappedValue(null),
    new WrappedValue(null),
    new WrappedValue(null),
    new WrappedValue(null),
    new WrappedValue(null)
];
var _wrappedIndex = 0;
/**
 * Represents a basic change from a previous to a new value.
 */
var SimpleChange = (function () {
    function SimpleChange(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
    }
    /**
     * Check whether the new value is the first value assigned.
     */
    SimpleChange.prototype.isFirstChange = function () { return this.previousValue === ChangeDetectionUtil.uninitialized; };
    return SimpleChange;
})();
exports.SimpleChange = SimpleChange;
var _simpleChangesIndex = 0;
var _simpleChanges = [
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null),
    new SimpleChange(null, null)
];
function _simpleChange(previousValue, currentValue) {
    var index = _simpleChangesIndex++ % 20;
    var s = _simpleChanges[index];
    s.previousValue = previousValue;
    s.currentValue = currentValue;
    return s;
}
/* tslint:disable:requireParameterType */
var ChangeDetectionUtil = (function () {
    function ChangeDetectionUtil() {
    }
    ChangeDetectionUtil.arrayFn0 = function () { return []; };
    ChangeDetectionUtil.arrayFn1 = function (a1) { return [a1]; };
    ChangeDetectionUtil.arrayFn2 = function (a1, a2) { return [a1, a2]; };
    ChangeDetectionUtil.arrayFn3 = function (a1, a2, a3) { return [a1, a2, a3]; };
    ChangeDetectionUtil.arrayFn4 = function (a1, a2, a3, a4) { return [a1, a2, a3, a4]; };
    ChangeDetectionUtil.arrayFn5 = function (a1, a2, a3, a4, a5) { return [a1, a2, a3, a4, a5]; };
    ChangeDetectionUtil.arrayFn6 = function (a1, a2, a3, a4, a5, a6) { return [a1, a2, a3, a4, a5, a6]; };
    ChangeDetectionUtil.arrayFn7 = function (a1, a2, a3, a4, a5, a6, a7) { return [a1, a2, a3, a4, a5, a6, a7]; };
    ChangeDetectionUtil.arrayFn8 = function (a1, a2, a3, a4, a5, a6, a7, a8) {
        return [a1, a2, a3, a4, a5, a6, a7, a8];
    };
    ChangeDetectionUtil.arrayFn9 = function (a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return [a1, a2, a3, a4, a5, a6, a7, a8, a9];
    };
    ChangeDetectionUtil.operation_negate = function (value) { return !value; };
    ChangeDetectionUtil.operation_add = function (left, right) { return left + right; };
    ChangeDetectionUtil.operation_subtract = function (left, right) { return left - right; };
    ChangeDetectionUtil.operation_multiply = function (left, right) { return left * right; };
    ChangeDetectionUtil.operation_divide = function (left, right) { return left / right; };
    ChangeDetectionUtil.operation_remainder = function (left, right) { return left % right; };
    ChangeDetectionUtil.operation_equals = function (left, right) { return left == right; };
    ChangeDetectionUtil.operation_not_equals = function (left, right) { return left != right; };
    ChangeDetectionUtil.operation_identical = function (left, right) { return left === right; };
    ChangeDetectionUtil.operation_not_identical = function (left, right) { return left !== right; };
    ChangeDetectionUtil.operation_less_then = function (left, right) { return left < right; };
    ChangeDetectionUtil.operation_greater_then = function (left, right) { return left > right; };
    ChangeDetectionUtil.operation_less_or_equals_then = function (left, right) { return left <= right; };
    ChangeDetectionUtil.operation_greater_or_equals_then = function (left, right) { return left >= right; };
    ChangeDetectionUtil.cond = function (cond, trueVal, falseVal) { return cond ? trueVal : falseVal; };
    ChangeDetectionUtil.mapFn = function (keys) {
        function buildMap(values) {
            var res = collection_1.StringMapWrapper.create();
            for (var i = 0; i < keys.length; ++i) {
                collection_1.StringMapWrapper.set(res, keys[i], values[i]);
            }
            return res;
        }
        switch (keys.length) {
            case 0:
                return function () { return []; };
            case 1:
                return function (a1) { return buildMap([a1]); };
            case 2:
                return function (a1, a2) { return buildMap([a1, a2]); };
            case 3:
                return function (a1, a2, a3) { return buildMap([a1, a2, a3]); };
            case 4:
                return function (a1, a2, a3, a4) { return buildMap([a1, a2, a3, a4]); };
            case 5:
                return function (a1, a2, a3, a4, a5) { return buildMap([a1, a2, a3, a4, a5]); };
            case 6:
                return function (a1, a2, a3, a4, a5, a6) { return buildMap([a1, a2, a3, a4, a5, a6]); };
            case 7:
                return function (a1, a2, a3, a4, a5, a6, a7) { return buildMap([a1, a2, a3, a4, a5, a6, a7]); };
            case 8:
                return function (a1, a2, a3, a4, a5, a6, a7, a8) { return buildMap([a1, a2, a3, a4, a5, a6, a7, a8]); };
            case 9:
                return function (a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                    return buildMap([a1, a2, a3, a4, a5, a6, a7, a8, a9]);
                };
            default:
                throw new exceptions_1.BaseException("Does not support literal maps with more than 9 elements");
        }
    };
    ChangeDetectionUtil.keyedAccess = function (obj, args) { return obj[args[0]]; };
    ChangeDetectionUtil.unwrapValue = function (value) {
        if (value instanceof WrappedValue) {
            return value.wrapped;
        }
        else {
            return value;
        }
    };
    ChangeDetectionUtil.changeDetectionMode = function (strategy) {
        return constants_1.isDefaultChangeDetectionStrategy(strategy) ? constants_1.ChangeDetectionStrategy.CheckAlways :
            constants_1.ChangeDetectionStrategy.CheckOnce;
    };
    ChangeDetectionUtil.simpleChange = function (previousValue, currentValue) {
        return _simpleChange(previousValue, currentValue);
    };
    ChangeDetectionUtil.isValueBlank = function (value) { return lang_1.isBlank(value); };
    ChangeDetectionUtil.s = function (value) { return lang_1.isPresent(value) ? "" + value : ''; };
    ChangeDetectionUtil.protoByIndex = function (protos, selfIndex) {
        return selfIndex < 1 ?
            null :
            protos[selfIndex - 1]; // self index is shifted by one because of context
    };
    ChangeDetectionUtil.callPipeOnDestroy = function (selectedPipe) {
        if (pipe_lifecycle_reflector_1.implementsOnDestroy(selectedPipe.pipe)) {
            selectedPipe.pipe.ngOnDestroy();
        }
    };
    ChangeDetectionUtil.bindingTarget = function (mode, elementIndex, name, unit, debug) {
        return new binding_record_1.BindingTarget(mode, elementIndex, name, unit, debug);
    };
    ChangeDetectionUtil.directiveIndex = function (elementIndex, directiveIndex) {
        return new directive_record_1.DirectiveIndex(elementIndex, directiveIndex);
    };
    ChangeDetectionUtil.looseNotIdentical = function (a, b) { return !lang_1.looseIdentical(a, b); };
    ChangeDetectionUtil.devModeEqual = function (a, b) {
        if (collection_1.isListLikeIterable(a) && collection_1.isListLikeIterable(b)) {
            return collection_1.areIterablesEqual(a, b, ChangeDetectionUtil.devModeEqual);
        }
        else if (!collection_1.isListLikeIterable(a) && !lang_1.isPrimitive(a) && !collection_1.isListLikeIterable(b) &&
            !lang_1.isPrimitive(b)) {
            return true;
        }
        else {
            return lang_1.looseIdentical(a, b);
        }
    };
    ChangeDetectionUtil.uninitialized = lang_1.CONST_EXPR(new Object());
    return ChangeDetectionUtil;
})();
exports.ChangeDetectionUtil = ChangeDetectionUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlX2RldGVjdGlvbl91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvcmUvY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uX3V0aWwudHMiXSwibmFtZXMiOlsiV3JhcHBlZFZhbHVlIiwiV3JhcHBlZFZhbHVlLmNvbnN0cnVjdG9yIiwiV3JhcHBlZFZhbHVlLndyYXAiLCJTaW1wbGVDaGFuZ2UiLCJTaW1wbGVDaGFuZ2UuY29uc3RydWN0b3IiLCJTaW1wbGVDaGFuZ2UuaXNGaXJzdENoYW5nZSIsIl9zaW1wbGVDaGFuZ2UiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5jb25zdHJ1Y3RvciIsIkNoYW5nZURldGVjdGlvblV0aWwuYXJyYXlGbjAiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmFycmF5Rm4xIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5hcnJheUZuMiIsIkNoYW5nZURldGVjdGlvblV0aWwuYXJyYXlGbjMiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmFycmF5Rm40IiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5hcnJheUZuNSIsIkNoYW5nZURldGVjdGlvblV0aWwuYXJyYXlGbjYiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmFycmF5Rm43IiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5hcnJheUZuOCIsIkNoYW5nZURldGVjdGlvblV0aWwuYXJyYXlGbjkiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9uZWdhdGUiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9hZGQiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9zdWJ0cmFjdCIsIkNoYW5nZURldGVjdGlvblV0aWwub3BlcmF0aW9uX211bHRpcGx5IiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5vcGVyYXRpb25fZGl2aWRlIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5vcGVyYXRpb25fcmVtYWluZGVyIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5vcGVyYXRpb25fZXF1YWxzIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5vcGVyYXRpb25fbm90X2VxdWFscyIsIkNoYW5nZURldGVjdGlvblV0aWwub3BlcmF0aW9uX2lkZW50aWNhbCIsIkNoYW5nZURldGVjdGlvblV0aWwub3BlcmF0aW9uX25vdF9pZGVudGljYWwiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9sZXNzX3RoZW4iLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9ncmVhdGVyX3RoZW4iLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm9wZXJhdGlvbl9sZXNzX29yX2VxdWFsc190aGVuIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5vcGVyYXRpb25fZ3JlYXRlcl9vcl9lcXVhbHNfdGhlbiIsIkNoYW5nZURldGVjdGlvblV0aWwuY29uZCIsIkNoYW5nZURldGVjdGlvblV0aWwubWFwRm4iLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLm1hcEZuLmJ1aWxkTWFwIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5rZXllZEFjY2VzcyIsIkNoYW5nZURldGVjdGlvblV0aWwudW53cmFwVmFsdWUiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmNoYW5nZURldGVjdGlvbk1vZGUiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLnNpbXBsZUNoYW5nZSIsIkNoYW5nZURldGVjdGlvblV0aWwuaXNWYWx1ZUJsYW5rIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5zIiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5wcm90b0J5SW5kZXgiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmNhbGxQaXBlT25EZXN0cm95IiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5iaW5kaW5nVGFyZ2V0IiwiQ2hhbmdlRGV0ZWN0aW9uVXRpbC5kaXJlY3RpdmVJbmRleCIsIkNoYW5nZURldGVjdGlvblV0aWwubG9vc2VOb3RJZGVudGljYWwiLCJDaGFuZ2VEZXRlY3Rpb25VdGlsLmRldk1vZGVFcXVhbCJdLCJtYXBwaW5ncyI6IkFBQUEscUJBUU8sMEJBQTBCLENBQUMsQ0FBQTtBQUNsQywyQkFBNEIsZ0NBQWdDLENBQUMsQ0FBQTtBQUM3RCwyQkFNTyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBRXhDLDBCQUF3RSxhQUFhLENBQUMsQ0FBQTtBQUN0Rix5Q0FBa0MsNEJBQTRCLENBQUMsQ0FBQTtBQUMvRCwrQkFBNEIsa0JBQWtCLENBQUMsQ0FBQTtBQUMvQyxpQ0FBNkIsb0JBQW9CLENBQUMsQ0FBQTtBQUlsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSDtJQUNFQSxzQkFBbUJBLE9BQVlBO1FBQVpDLFlBQU9BLEdBQVBBLE9BQU9BLENBQUtBO0lBQUdBLENBQUNBO0lBRTVCRCxpQkFBSUEsR0FBWEEsVUFBWUEsS0FBVUE7UUFDcEJFLElBQUlBLENBQUNBLEdBQUdBLGNBQWNBLENBQUNBLGFBQWFBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1FBQzVDQSxDQUFDQSxDQUFDQSxPQUFPQSxHQUFHQSxLQUFLQSxDQUFDQTtRQUNsQkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDWEEsQ0FBQ0E7SUFDSEYsbUJBQUNBO0FBQURBLENBQUNBLEFBUkQsSUFRQztBQVJZLG9CQUFZLGVBUXhCLENBQUE7QUFFRCxJQUFJLGNBQWMsR0FBRztJQUNuQixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUM7SUFDdEIsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDO0lBQ3RCLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQztJQUN0QixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUM7SUFDdEIsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDO0NBQ3ZCLENBQUM7QUFFRixJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUM7QUFFdEI7O0dBRUc7QUFDSDtJQUNFRyxzQkFBbUJBLGFBQWtCQSxFQUFTQSxZQUFpQkE7UUFBNUNDLGtCQUFhQSxHQUFiQSxhQUFhQSxDQUFLQTtRQUFTQSxpQkFBWUEsR0FBWkEsWUFBWUEsQ0FBS0E7SUFBR0EsQ0FBQ0E7SUFFbkVEOztPQUVHQTtJQUNIQSxvQ0FBYUEsR0FBYkEsY0FBMkJFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLEtBQUtBLG1CQUFtQkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDL0ZGLG1CQUFDQTtBQUFEQSxDQUFDQSxBQVBELElBT0M7QUFQWSxvQkFBWSxlQU94QixDQUFBO0FBRUQsSUFBSSxtQkFBbUIsR0FBRyxDQUFDLENBQUM7QUFDNUIsSUFBSSxjQUFjLEdBQUc7SUFDbkIsSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztJQUM1QixJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0lBQzVCLElBQUksWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7SUFDNUIsSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztJQUM1QixJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0lBQzVCLElBQUksWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7SUFDNUIsSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztJQUM1QixJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0lBQzVCLElBQUksWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7SUFDNUIsSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztJQUM1QixJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0lBQzVCLElBQUksWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7SUFDNUIsSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztJQUM1QixJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0lBQzVCLElBQUksWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7SUFDNUIsSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztJQUM1QixJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0lBQzVCLElBQUksWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7SUFDNUIsSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztJQUM1QixJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0NBQzdCLENBQUM7QUFFRix1QkFBdUIsYUFBYSxFQUFFLFlBQVk7SUFDaERHLElBQUlBLEtBQUtBLEdBQUdBLG1CQUFtQkEsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7SUFDdkNBLElBQUlBLENBQUNBLEdBQUdBLGNBQWNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO0lBQzlCQSxDQUFDQSxDQUFDQSxhQUFhQSxHQUFHQSxhQUFhQSxDQUFDQTtJQUNoQ0EsQ0FBQ0EsQ0FBQ0EsWUFBWUEsR0FBR0EsWUFBWUEsQ0FBQ0E7SUFDOUJBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO0FBQ1hBLENBQUNBO0FBRUQseUNBQXlDO0FBQ3pDO0lBQUFDO0lBZ0lBQyxDQUFDQTtJQTdIUUQsNEJBQVFBLEdBQWZBLGNBQTJCRSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNoQ0YsNEJBQVFBLEdBQWZBLFVBQWdCQSxFQUFFQSxJQUFXRyxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNwQ0gsNEJBQVFBLEdBQWZBLFVBQWdCQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFXSSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUM1Q0osNEJBQVFBLEdBQWZBLFVBQWdCQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFXSyxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNwREwsNEJBQVFBLEdBQWZBLFVBQWdCQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFXTSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUM1RE4sNEJBQVFBLEdBQWZBLFVBQWdCQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFXTyxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNwRVAsNEJBQVFBLEdBQWZBLFVBQWdCQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFXUSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUM1RVIsNEJBQVFBLEdBQWZBLFVBQWdCQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFXUyxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNwRlQsNEJBQVFBLEdBQWZBLFVBQWdCQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQTtRQUM1Q1UsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEs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LENBQUNBO2dCQUNKQSxNQUFNQSxDQUFDQSxVQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFLQSxPQUFBQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUF0QkEsQ0FBc0JBLENBQUNBO1lBQ2hEQSxLQUFLQSxDQUFDQTtnQkFDSkEsTUFBTUEsQ0FBQ0EsVUFBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsSUFBS0EsT0FBQUEsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBMUJBLENBQTBCQSxDQUFDQTtZQUN4REEsS0FBS0EsQ0FBQ0E7Z0JBQ0pBLE1BQU1BLENBQUNBLFVBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUtBLE9BQUFBLFFBQVFBLENBQUNBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBLENBQUNBLEVBQTlCQSxDQUE4QkEsQ0FBQ0E7WUFDaEVBLEtBQUtBLENBQUNBO2dCQUNKQSxNQUFNQSxDQUFDQSxVQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFLQSxPQUFBQSxRQUFRQSxDQUFDQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUFsQ0EsQ0FBa0NBLENBQUNBO1lBQ3hFQSxLQUFLQSxDQUFDQTtnQkFDSkEsTUFBTUEsQ0FBQ0EsVUFBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEs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LEVBQUVBLENBQUNBLEVBQUVBLG1CQUFtQkEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0E7UUFFbkVBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLCtCQUFrQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esa0JBQVdBLENBQUNBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLCtCQUFrQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbkVBLENBQUNBLGtCQUFXQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMzQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFFZEEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDTkEsTUFBTUEsQ0FBQ0EscUJBQWNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO1FBQzlCQSxDQUFDQTtJQUNIQSxDQUFDQTtJQTlITXhDLGlDQUFhQSxHQUFXQSxpQkFBVUEsQ0FBU0EsSUFBSUEsTUFBTUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7SUErSGxFQSwwQkFBQ0E7QUFBREEsQ0FBQ0EsQUFoSUQsSUFnSUM7QUFoSVksMkJBQW1CLHNCQWdJL0IsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENPTlNUX0VYUFIsXG4gIGlzUHJlc2VudCxcbiAgaXNCbGFuayxcbiAgVHlwZSxcbiAgU3RyaW5nV3JhcHBlcixcbiAgbG9vc2VJZGVudGljYWwsXG4gIGlzUHJpbWl0aXZlXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge0Jhc2VFeGNlcHRpb259IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucyc7XG5pbXBvcnQge1xuICBMaXN0V3JhcHBlcixcbiAgTWFwV3JhcHBlcixcbiAgU3RyaW5nTWFwV3JhcHBlcixcbiAgaXNMaXN0TGlrZUl0ZXJhYmxlLFxuICBhcmVJdGVyYWJsZXNFcXVhbFxufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtQcm90b1JlY29yZH0gZnJvbSAnLi9wcm90b19yZWNvcmQnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgaXNEZWZhdWx0Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3l9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7aW1wbGVtZW50c09uRGVzdHJveX0gZnJvbSAnLi9waXBlX2xpZmVjeWNsZV9yZWZsZWN0b3InO1xuaW1wb3J0IHtCaW5kaW5nVGFyZ2V0fSBmcm9tICcuL2JpbmRpbmdfcmVjb3JkJztcbmltcG9ydCB7RGlyZWN0aXZlSW5kZXh9IGZyb20gJy4vZGlyZWN0aXZlX3JlY29yZCc7XG5pbXBvcnQge1NlbGVjdGVkUGlwZX0gZnJvbSAnLi9waXBlcyc7XG5cblxuLyoqXG4gKiBJbmRpY2F0ZXMgdGhhdCB0aGUgcmVzdWx0IG9mIGEge0BsaW5rIFBpcGVNZXRhZGF0YX0gdHJhbnNmb3JtYXRpb24gaGFzIGNoYW5nZWQgZXZlbiB0aG91Z2ggdGhlXG4gKiByZWZlcmVuY2VcbiAqIGhhcyBub3QgY2hhbmdlZC5cbiAqXG4gKiBUaGUgd3JhcHBlZCB2YWx1ZSB3aWxsIGJlIHVud3JhcHBlZCBieSBjaGFuZ2UgZGV0ZWN0aW9uLCBhbmQgdGhlIHVud3JhcHBlZCB2YWx1ZSB3aWxsIGJlIHN0b3JlZC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYFxuICogaWYgKHRoaXMuX2xhdGVzdFZhbHVlID09PSB0aGlzLl9sYXRlc3RSZXR1cm5lZFZhbHVlKSB7XG4gKiAgICByZXR1cm4gdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZTtcbiAqICB9IGVsc2Uge1xuICogICAgdGhpcy5fbGF0ZXN0UmV0dXJuZWRWYWx1ZSA9IHRoaXMuX2xhdGVzdFZhbHVlO1xuICogICAgcmV0dXJuIFdyYXBwZWRWYWx1ZS53cmFwKHRoaXMuX2xhdGVzdFZhbHVlKTsgLy8gdGhpcyB3aWxsIGZvcmNlIHVwZGF0ZVxuICogIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgV3JhcHBlZFZhbHVlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHdyYXBwZWQ6IGFueSkge31cblxuICBzdGF0aWMgd3JhcCh2YWx1ZTogYW55KTogV3JhcHBlZFZhbHVlIHtcbiAgICB2YXIgdyA9IF93cmFwcGVkVmFsdWVzW193cmFwcGVkSW5kZXgrKyAlIDVdO1xuICAgIHcud3JhcHBlZCA9IHZhbHVlO1xuICAgIHJldHVybiB3O1xuICB9XG59XG5cbnZhciBfd3JhcHBlZFZhbHVlcyA9IFtcbiAgbmV3IFdyYXBwZWRWYWx1ZShudWxsKSxcbiAgbmV3IFdyYXBwZWRWYWx1ZShudWxsKSxcbiAgbmV3IFdyYXBwZWRWYWx1ZShudWxsKSxcbiAgbmV3IFdyYXBwZWRWYWx1ZShudWxsKSxcbiAgbmV3IFdyYXBwZWRWYWx1ZShudWxsKVxuXTtcblxudmFyIF93cmFwcGVkSW5kZXggPSAwO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBiYXNpYyBjaGFuZ2UgZnJvbSBhIHByZXZpb3VzIHRvIGEgbmV3IHZhbHVlLlxuICovXG5leHBvcnQgY2xhc3MgU2ltcGxlQ2hhbmdlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHByZXZpb3VzVmFsdWU6IGFueSwgcHVibGljIGN1cnJlbnRWYWx1ZTogYW55KSB7fVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIHRoZSBuZXcgdmFsdWUgaXMgdGhlIGZpcnN0IHZhbHVlIGFzc2lnbmVkLlxuICAgKi9cbiAgaXNGaXJzdENoYW5nZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMucHJldmlvdXNWYWx1ZSA9PT0gQ2hhbmdlRGV0ZWN0aW9uVXRpbC51bmluaXRpYWxpemVkOyB9XG59XG5cbnZhciBfc2ltcGxlQ2hhbmdlc0luZGV4ID0gMDtcbnZhciBfc2ltcGxlQ2hhbmdlcyA9IFtcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKSxcbiAgbmV3IFNpbXBsZUNoYW5nZShudWxsLCBudWxsKVxuXTtcblxuZnVuY3Rpb24gX3NpbXBsZUNoYW5nZShwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpOiBTaW1wbGVDaGFuZ2Uge1xuICB2YXIgaW5kZXggPSBfc2ltcGxlQ2hhbmdlc0luZGV4KysgJSAyMDtcbiAgdmFyIHMgPSBfc2ltcGxlQ2hhbmdlc1tpbmRleF07XG4gIHMucHJldmlvdXNWYWx1ZSA9IHByZXZpb3VzVmFsdWU7XG4gIHMuY3VycmVudFZhbHVlID0gY3VycmVudFZhbHVlO1xuICByZXR1cm4gcztcbn1cblxuLyogdHNsaW50OmRpc2FibGU6cmVxdWlyZVBhcmFtZXRlclR5cGUgKi9cbmV4cG9ydCBjbGFzcyBDaGFuZ2VEZXRlY3Rpb25VdGlsIHtcbiAgc3RhdGljIHVuaW5pdGlhbGl6ZWQ6IE9iamVjdCA9IENPTlNUX0VYUFI8T2JqZWN0PihuZXcgT2JqZWN0KCkpO1xuXG4gIHN0YXRpYyBhcnJheUZuMCgpOiBhbnlbXSB7IHJldHVybiBbXTsgfVxuICBzdGF0aWMgYXJyYXlGbjEoYTEpOiBhbnlbXSB7IHJldHVybiBbYTFdOyB9XG4gIHN0YXRpYyBhcnJheUZuMihhMSwgYTIpOiBhbnlbXSB7IHJldHVybiBbYTEsIGEyXTsgfVxuICBzdGF0aWMgYXJyYXlGbjMoYTEsIGEyLCBhMyk6IGFueVtdIHsgcmV0dXJuIFthMSwgYTIsIGEzXTsgfVxuICBzdGF0aWMgYXJyYXlGbjQoYTEsIGEyLCBhMywgYTQpOiBhbnlbXSB7IHJldHVybiBbYTEsIGEyLCBhMywgYTRdOyB9XG4gIHN0YXRpYyBhcnJheUZuNShhMSwgYTIsIGEzLCBhNCwgYTUpOiBhbnlbXSB7IHJldHVybiBbYTEsIGEyLCBhMywgYTQsIGE1XTsgfVxuICBzdGF0aWMgYXJyYXlGbjYoYTEsIGEyLCBhMywgYTQsIGE1LCBhNik6IGFueVtdIHsgcmV0dXJuIFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2XTsgfVxuICBzdGF0aWMgYXJyYXlGbjcoYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpOiBhbnlbXSB7IHJldHVybiBbYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTddOyB9XG4gIHN0YXRpYyBhcnJheUZuOChhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpOiBhbnlbXSB7XG4gICAgcmV0dXJuIFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYThdO1xuICB9XG4gIHN0YXRpYyBhcnJheUZuOShhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5KTogYW55W10ge1xuICAgIHJldHVybiBbYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOV07XG4gIH1cblxuICBzdGF0aWMgb3BlcmF0aW9uX25lZ2F0ZSh2YWx1ZSk6IGFueSB7IHJldHVybiAhdmFsdWU7IH1cbiAgc3RhdGljIG9wZXJhdGlvbl9hZGQobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCArIHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fc3VidHJhY3QobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCAtIHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fbXVsdGlwbHkobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCAqIHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fZGl2aWRlKGxlZnQsIHJpZ2h0KTogYW55IHsgcmV0dXJuIGxlZnQgLyByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX3JlbWFpbmRlcihsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0ICUgcmlnaHQ7IH1cbiAgc3RhdGljIG9wZXJhdGlvbl9lcXVhbHMobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCA9PSByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX25vdF9lcXVhbHMobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCAhPSByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX2lkZW50aWNhbChsZWZ0LCByaWdodCk6IGFueSB7IHJldHVybiBsZWZ0ID09PSByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX25vdF9pZGVudGljYWwobGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCAhPT0gcmlnaHQ7IH1cbiAgc3RhdGljIG9wZXJhdGlvbl9sZXNzX3RoZW4obGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCA8IHJpZ2h0OyB9XG4gIHN0YXRpYyBvcGVyYXRpb25fZ3JlYXRlcl90aGVuKGxlZnQsIHJpZ2h0KTogYW55IHsgcmV0dXJuIGxlZnQgPiByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX2xlc3Nfb3JfZXF1YWxzX3RoZW4obGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCA8PSByaWdodDsgfVxuICBzdGF0aWMgb3BlcmF0aW9uX2dyZWF0ZXJfb3JfZXF1YWxzX3RoZW4obGVmdCwgcmlnaHQpOiBhbnkgeyByZXR1cm4gbGVmdCA+PSByaWdodDsgfVxuICBzdGF0aWMgY29uZChjb25kLCB0cnVlVmFsLCBmYWxzZVZhbCk6IGFueSB7IHJldHVybiBjb25kID8gdHJ1ZVZhbCA6IGZhbHNlVmFsOyB9XG5cbiAgc3RhdGljIG1hcEZuKGtleXM6IGFueVtdKTogYW55IHtcbiAgICBmdW5jdGlvbiBidWlsZE1hcCh2YWx1ZXMpOiB7W2s6IC8qYW55Ki8gc3RyaW5nXTogYW55fSB7XG4gICAgICB2YXIgcmVzID0gU3RyaW5nTWFwV3JhcHBlci5jcmVhdGUoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBTdHJpbmdNYXBXcmFwcGVyLnNldChyZXMsIGtleXNbaV0sIHZhbHVlc1tpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIHN3aXRjaCAoa2V5cy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuICgpID0+IFtdO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gKGExKSA9PiBidWlsZE1hcChbYTFdKTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIChhMSwgYTIpID0+IGJ1aWxkTWFwKFthMSwgYTJdKTtcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIChhMSwgYTIsIGEzKSA9PiBidWlsZE1hcChbYTEsIGEyLCBhM10pO1xuICAgICAgY2FzZSA0OlxuICAgICAgICByZXR1cm4gKGExLCBhMiwgYTMsIGE0KSA9PiBidWlsZE1hcChbYTEsIGEyLCBhMywgYTRdKTtcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgcmV0dXJuIChhMSwgYTIsIGEzLCBhNCwgYTUpID0+IGJ1aWxkTWFwKFthMSwgYTIsIGEzLCBhNCwgYTVdKTtcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgcmV0dXJuIChhMSwgYTIsIGEzLCBhNCwgYTUsIGE2KSA9PiBidWlsZE1hcChbYTEsIGEyLCBhMywgYTQsIGE1LCBhNl0pO1xuICAgICAgY2FzZSA3OlxuICAgICAgICByZXR1cm4gKGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3KSA9PiBidWlsZE1hcChbYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTddKTtcbiAgICAgIGNhc2UgODpcbiAgICAgICAgcmV0dXJuIChhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgpID0+IGJ1aWxkTWFwKFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYThdKTtcbiAgICAgIGNhc2UgOTpcbiAgICAgICAgcmV0dXJuIChhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5KSA9PlxuICAgICAgICAgICAgICAgICAgIGJ1aWxkTWFwKFthMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5XSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgRG9lcyBub3Qgc3VwcG9ydCBsaXRlcmFsIG1hcHMgd2l0aCBtb3JlIHRoYW4gOSBlbGVtZW50c2ApO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBrZXllZEFjY2VzcyhvYmosIGFyZ3MpOiBhbnkgeyByZXR1cm4gb2JqW2FyZ3NbMF1dOyB9XG5cbiAgc3RhdGljIHVud3JhcFZhbHVlKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFdyYXBwZWRWYWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlLndyYXBwZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgY2hhbmdlRGV0ZWN0aW9uTW9kZShzdHJhdGVneTogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kpOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB7XG4gICAgcmV0dXJuIGlzRGVmYXVsdENoYW5nZURldGVjdGlvblN0cmF0ZWd5KHN0cmF0ZWd5KSA/IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkNoZWNrQWx3YXlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuQ2hlY2tPbmNlO1xuICB9XG5cbiAgc3RhdGljIHNpbXBsZUNoYW5nZShwcmV2aW91c1ZhbHVlOiBhbnksIGN1cnJlbnRWYWx1ZTogYW55KTogU2ltcGxlQ2hhbmdlIHtcbiAgICByZXR1cm4gX3NpbXBsZUNoYW5nZShwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpO1xuICB9XG5cbiAgc3RhdGljIGlzVmFsdWVCbGFuayh2YWx1ZTogYW55KTogYm9vbGVhbiB7IHJldHVybiBpc0JsYW5rKHZhbHVlKTsgfVxuXG4gIHN0YXRpYyBzKHZhbHVlOiBhbnkpOiBzdHJpbmcgeyByZXR1cm4gaXNQcmVzZW50KHZhbHVlKSA/IGAke3ZhbHVlfWAgOiAnJzsgfVxuXG4gIHN0YXRpYyBwcm90b0J5SW5kZXgocHJvdG9zOiBQcm90b1JlY29yZFtdLCBzZWxmSW5kZXg6IG51bWJlcik6IFByb3RvUmVjb3JkIHtcbiAgICByZXR1cm4gc2VsZkluZGV4IDwgMSA/XG4gICAgICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgICAgIHByb3Rvc1tzZWxmSW5kZXggLSAxXTsgIC8vIHNlbGYgaW5kZXggaXMgc2hpZnRlZCBieSBvbmUgYmVjYXVzZSBvZiBjb250ZXh0XG4gIH1cblxuICBzdGF0aWMgY2FsbFBpcGVPbkRlc3Ryb3koc2VsZWN0ZWRQaXBlOiBTZWxlY3RlZFBpcGUpOiB2b2lkIHtcbiAgICBpZiAoaW1wbGVtZW50c09uRGVzdHJveShzZWxlY3RlZFBpcGUucGlwZSkpIHtcbiAgICAgICg8YW55PnNlbGVjdGVkUGlwZS5waXBlKS5uZ09uRGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBiaW5kaW5nVGFyZ2V0KG1vZGU6IHN0cmluZywgZWxlbWVudEluZGV4OiBudW1iZXIsIG5hbWU6IHN0cmluZywgdW5pdDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Zzogc3RyaW5nKTogQmluZGluZ1RhcmdldCB7XG4gICAgcmV0dXJuIG5ldyBCaW5kaW5nVGFyZ2V0KG1vZGUsIGVsZW1lbnRJbmRleCwgbmFtZSwgdW5pdCwgZGVidWcpO1xuICB9XG5cbiAgc3RhdGljIGRpcmVjdGl2ZUluZGV4KGVsZW1lbnRJbmRleDogbnVtYmVyLCBkaXJlY3RpdmVJbmRleDogbnVtYmVyKTogRGlyZWN0aXZlSW5kZXgge1xuICAgIHJldHVybiBuZXcgRGlyZWN0aXZlSW5kZXgoZWxlbWVudEluZGV4LCBkaXJlY3RpdmVJbmRleCk7XG4gIH1cblxuICBzdGF0aWMgbG9vc2VOb3RJZGVudGljYWwoYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuICFsb29zZUlkZW50aWNhbChhLCBiKTsgfVxuXG4gIHN0YXRpYyBkZXZNb2RlRXF1YWwoYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHtcbiAgICBpZiAoaXNMaXN0TGlrZUl0ZXJhYmxlKGEpICYmIGlzTGlzdExpa2VJdGVyYWJsZShiKSkge1xuICAgICAgcmV0dXJuIGFyZUl0ZXJhYmxlc0VxdWFsKGEsIGIsIENoYW5nZURldGVjdGlvblV0aWwuZGV2TW9kZUVxdWFsKTtcblxuICAgIH0gZWxzZSBpZiAoIWlzTGlzdExpa2VJdGVyYWJsZShhKSAmJiAhaXNQcmltaXRpdmUoYSkgJiYgIWlzTGlzdExpa2VJdGVyYWJsZShiKSAmJlxuICAgICAgICAgICAgICAgIWlzUHJpbWl0aXZlKGIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbG9vc2VJZGVudGljYWwoYSwgYik7XG4gICAgfVxuICB9XG59XG4iXX0=