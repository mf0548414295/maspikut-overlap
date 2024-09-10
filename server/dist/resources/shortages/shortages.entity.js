"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shortage = exports.ShortageStatus = void 0;
const typeorm_1 = require("typeorm");
const forces_entity_1 = require("../forces/forces.entity");
var ShortageStatus;
(function (ShortageStatus) {
    ShortageStatus[ShortageStatus["OPEN"] = 1] = "OPEN";
    ShortageStatus[ShortageStatus["IN_PROGRESS"] = 2] = "IN_PROGRESS";
    ShortageStatus[ShortageStatus["CLOSED"] = 3] = "CLOSED";
})(ShortageStatus = exports.ShortageStatus || (exports.ShortageStatus = {}));
let Shortage = class Shortage {
    id;
    force;
    name;
    status;
    updatedAt;
    createdAt;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Shortage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => forces_entity_1.Force, { onDelete: 'CASCADE' }),
    __metadata("design:type", forces_entity_1.Force)
], Shortage.prototype, "force", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Shortage.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ShortageStatus,
    }),
    __metadata("design:type", Number)
], Shortage.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Shortage.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Shortage.prototype, "createdAt", void 0);
Shortage = __decorate([
    (0, typeorm_1.Entity)('shortages')
], Shortage);
exports.Shortage = Shortage;
