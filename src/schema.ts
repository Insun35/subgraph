import { BigInt, Bytes, Entity, log, store, Value, ValueKind } from "@graphprotocol/graph-ts"

const BIG_INT_ZERO = BigInt.zero()

export class Member extends Entity {
    constructor(id: string) {
        super()
        this.set("id", Value.fromString(id))

        this.set("identityCommitment", Value.fromBytes(Bytes.empty()))
        this.set("rootHash", Value.fromString(""))
        this.set("groupId", Value.fromString(""))
        this.set("index", Value.fromNull())
    }

    save(): void {
        log.debug("saving Member: {}", [this.id])
        const id = this.get("id")

        assert(id != null, "Cannot save Member entity without an ID")

        if (id) {
            assert(
                id.kind == ValueKind.STRING,
                "Cannot save Member entity with non-string ID. " +
                    'Considering using .toHex() to convert the "id" to a string.'
            )
            store.set("Member", id.toString(), this)
        }
    }

    static load(id: string): Member | null {
        return changetype<Member | null>(store.get("Member", id))
    }

    get id(): string {
        let value = this.get("id")
        return value!.toString()
    }

    set id(value: string) {
        this.set("id", Value.fromString(value))
    }

    get identityCommitment(): string {
        let value = this.get("identityCommitment")
        return value!.toString()
    }

    set identityCommitment(value: string) {
        this.set("identityCommitment", Value.fromString(value))
    }

    get rootHash(): string {
        let value = this.get("rootHash")
        return value!.toString()
    }

    set rootHash(value: string) {
        this.set("rootHash", Value.fromString(value))
    }

    get group(): string {
        let value = this.get("group")
        return value!.toString()
    }

    set group(value: string) {
        this.set("group", Value.fromString(value))
    }

    get leafIndex(): BigInt {
        let value = this.get("leafIndex")
        return value!.toBigInt()
    }

    set leafIndex(value: BigInt) {
        this.set("leafIndex", Value.fromBigInt(value))
    }
}

export class Group extends Entity {
    constructor(provider: string, name: string) {
        super()
        this.set("id", Value.fromString(provider + "_" + name))
        this.set("provider", Value.fromString(provider))
        this.set("name", Value.fromString(name))
        this.set("leafCount", Value.fromBigInt(BIG_INT_ZERO))
        this.set("memberCount", Value.fromBigInt(BIG_INT_ZERO))
    }

    save(): void {
        let id = this.get("id")
        assert(id != null, "Cannot save Group entity without an ID")
        if (id) {
            assert(
                id.kind == ValueKind.STRING,
                "Cannot save Group entity with non-string ID. " +
                    'Considering using .toHex() to convert the "id" to a string.'
            )
            store.set("Group", id.toString(), this)
        }
    }

    static load(provider: string, name: string): Group | null {
        return changetype<Group | null>(store.get("Group", provider + "_" + name))
    }

    get id(): string {
        let value = this.get("id")
        return value!.toString()
    }

    set id(value: string) {
        this.set("id", Value.fromString(value))
    }

    get provider(): string {
        let value = this.get("provider")
        return value!.toString()
    }

    set provider(value: string) {
        this.set("provider", Value.fromString(value))
    }

    get name(): string {
        let value = this.get("name")
        return value!.toString()
    }

    set name(value: string) {
        this.set("name", Value.fromString(value))
    }

    get leafCount(): BigInt {
        let value = this.get("leafCount")
        let bi: BigInt
        if (value == null) {
            bi = BIG_INT_ZERO
        } else {
            bi = value.toBigInt()
        }
        return bi
    }

    set leafCount(value: BigInt) {
        this.set("leafCount", Value.fromBigInt(value))
    }

    get memberCount(): BigInt {
        let value = this.get("memberCount")
        let bi: BigInt
        if (value == null) {
            bi = BIG_INT_ZERO
        } else {
            bi = value.toBigInt()
        }
        return bi
    }

    set memberCount(value: BigInt) {
        this.set("memberCount", Value.fromBigInt(value))
    }
}
