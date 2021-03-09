import request from '@/utils/request';

/**
 * 主人结构体
 */
export interface Owner {
    name: string;  // 主人名称
    gender: string;  // 主人性别
    age: number;   // 主人年龄
    pets?: Pet[];  // 主人宠物列表
}

/**
 * 宠物结构体
 */
export interface Pet {
    name: string;  // 宠物名称
    type: string;  // 宠物类型
}


/**
 * 获取主人列表
 *
 * @export
 * @returns {Promise<Owner[]>}
 */
export function getOwnerList(): Promise<Owner[]> {
    return request.get<Owner[]>('/owners', null);
}