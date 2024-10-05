/*
  Warnings:

  - A unique constraint covering the columns `[regione,prov,zona,microzona,anno,semestre]` on the table `zona` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "zona_regione_prov_zona_microzona_anno_semestre_key" ON "zona"("regione", "prov", "zona", "microzona", "anno", "semestre");
