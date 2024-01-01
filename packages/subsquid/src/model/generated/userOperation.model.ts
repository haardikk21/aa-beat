import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class UserOperation {
    constructor(props?: Partial<UserOperation>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("text", {nullable: false})
    network!: string

    @Index_()
    @Column_("text", {nullable: false})
    sender!: string

    @Index_()
    @Column_("text", {nullable: false})
    paymaster!: string

    @Index_()
    @Column_("text", {nullable: false})
    bundler!: string

    @Column_("text", {nullable: false})
    userOpHash!: string

    @Index_()
    @Column_("bool", {nullable: false})
    success!: boolean

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    actualGasCost!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    actualGasUsed!: bigint

    @Index_()
    @Column_("int4", {nullable: false})
    block!: number

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Index_()
    @Column_("text", {nullable: false})
    txHash!: string
}
