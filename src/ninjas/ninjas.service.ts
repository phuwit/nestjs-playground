import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from 'src/ninjas/dto/create-ninja.dto';
import { UpdateNinjaDto } from 'src/ninjas/dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 0, name: 'Alice', weapon: 'stars' },
    { id: 1, name: 'Bob', weapon: 'nunchucks' },
  ];

  getAllNinjas(weapon?: 'stars' | 'nunchucks') {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }

    return this.ninjas;
  }

  getNinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);

    if (!ninja) {
      throw new Error(`Ninja #${id} not found`);
    }

    return ninja;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    const ninja = {
      ...createNinjaDto,
      id: Date.now(),
    };

    this.ninjas.push(ninja);

    return ninja;
  }

  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id === id) {
        return { ...ninja, ...updateNinjaDto };
      }

      return ninja;
    });

    return this.getNinja(id);
  }

  removeNinja(id: number) {
    const ninjaToRemove = this.getNinja(id);

    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);

    return ninjaToRemove;
  }
}
