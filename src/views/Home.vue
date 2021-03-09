<template>
  <div class="home">
    <ul>
      <div v-for="(item, index) in petArray" v-bind:key="index">
        {{ item.gender }}
        <div v-for="(item, index) in item.pets" v-bind:key="index" id="content">
          {{ item.name }}
        </div>
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Owner, Pet, getOwnerList } from "@/api/owners";
interface Item {
  gender: string;
  pets: Pet[];
}
@Component({})
export default class Home extends Vue {
  private petMap: Map<string, Pet[]> = new Map();
  private petArray: Item[] = [];
  private petType: string = "Cat"; // 选择宠物
  created() {
    this.getList();
  }

  /**
   * 获取主人列表
   */
  private async getList() {
    const that: any = this;
    const res: Owner[] = await getOwnerList();
    console.log(res);

    for (let index = 0; index < res.length; index++) {
      const element = res[index];
      if (element.pets != null && element.pets.length > 0) {
        let pets: any = [];
        if (
          this.petMap.get(element.gender) != null &&
          this.petMap.get(element.gender)?.length != 0
        ) {
          pets = this.petMap.get(element.gender);
        }
        for (let index = 0; index < element.pets.length; index++) {
          const ele = element.pets[index];
          if (ele.type  == this.petType) {
            pets.push(ele);
          }
        }
        this.petMap.set(element.gender, pets);
      }
    }
    that.petArray = [];
    this.petMap.forEach(function (value, key) {
      console.log(value, key);
      // 按照宠物名字的字母顺序排序
      value.sort((a: Pet, b: Pet) => {
        return a.name.localeCompare(b.name);
      });
      that.petArray.push({
        gender: key,
        pets: value,
      });
    });
    console.log(that.petArray);
  }
}
</script>
