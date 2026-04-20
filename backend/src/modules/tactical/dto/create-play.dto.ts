import { IsNotEmpty, IsString, IsObject } from 'class-validator';

export class CreatePlayDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsObject()
  @IsNotEmpty()
  canvasData: any; // El JSON de Fabric.js
}