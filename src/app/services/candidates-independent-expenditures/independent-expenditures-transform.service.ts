import { Injectable } from '@angular/core';
import {
  IndependentExpenditureFiler,
  IndependentExpendituresCandidate,
} from './independent-expenditures-api.service';

type CandidateSeries = {
  candidateId: string;
  candidateName: string;
  support: IndependentExpenditureFiler[];
  supportTotal: number;
  oppose: IndependentExpenditureFiler[];
  opposeTotal: number;
};

/**
 * Combine filers with the same name and add the combined amounts for each duplicate
 */
function getUniqueFilers<
  T extends {
    filerName: string;
    amount: number;
  },
>({ filers }: { filers: T[] }) {
  const merged = filers.reduce((acc, current) => {
    const existing = acc.get(current.filerName.toLowerCase());

    if (existing) {
      existing.amount += current.amount;
    } else {
      acc.set(current.filerName.toLowerCase(), { ...current });
    }

    return acc;
  }, new Map<string, T>());

  // Convert the Map back into an array
  const result: T[] = Array.from(merged.values());

  return result;
}

@Injectable({ providedIn: 'root' })
export class IndependentExpendituresTransformService {
  filterForInGeneralCandidates(
    data: IndependentExpendituresCandidate[],
  ): IndependentExpendituresCandidate[] {
    // if any candidate has the inGeneralElection condition set
    // then filter all by their inGeneralElection
    const hasGeneral = data.some((candidate) => candidate.inGeneralElection);

    return hasGeneral
      ? data.filter((candidate) => candidate.inGeneralElection)
      : data;
  }

  buildFilerSeriesForCandidates(data: IndependentExpendituresCandidate[]) {
    const candidateSeries: CandidateSeries[] = data
      // combine f460d and s496 support and oppose filers and amounts for each candidate
      .map((candidate) => {
        const supportFilers = getUniqueFilers({
          filers: [...candidate.f460d.support, ...candidate.s496.support],
        });

        const supportTotal = supportFilers.reduce(
          (accumulator, filer) => accumulator + filer.amount,
          0,
        );

        const opposeFilers = getUniqueFilers({
          filers: [...candidate.f460d.oppose, ...candidate.s496.oppose],
        });

        const opposeTotal = opposeFilers.reduce(
          (accumulator, filer) => accumulator + filer.amount,
          0,
        );

        return {
          candidateId: candidate.candidateId,
          candidateName: candidate.candidateName,
          support: supportFilers,
          oppose: opposeFilers,
          supportTotal,
          opposeTotal,
        };
      })
      .flat()
      .sort((a, b) =>
        // a.combinedAmount - b.combinedAmount ||
        b.candidateName.localeCompare(a.candidateName),
      );

    return { candidateSeries };
  }
}
