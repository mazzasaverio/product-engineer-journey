-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "microZoneOMI" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "zona" (
    "id" TEXT NOT NULL,
    "zona" TEXT,
    "zona_descr" TEXT,
    "microzona" DOUBLE PRECISION,
    "cod_tip_prev" INTEGER,
    "regione" TEXT,
    "prov" TEXT,
    "comune_descrizione" TEXT,
    "fascia" TEXT,
    "cod_tip" INTEGER,
    "descr_tipologia" TEXT,
    "stato" TEXT,
    "stato_prev" TEXT,
    "compr_min" DOUBLE PRECISION,
    "compr_max" DOUBLE PRECISION,
    "sup_nl_compr" TEXT,
    "loc_min" TEXT,
    "loc_max" TEXT,
    "sup_nl_loc" TEXT,
    "anno" TEXT,
    "semestre" TEXT,
    "data_elaborazione" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "zona_pkey" PRIMARY KEY ("id")
);
