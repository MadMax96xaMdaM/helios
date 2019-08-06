import { RealDebridTorrentsAddMagnetForm } from '../forms/torrents/real-debrid-torrents-add-magnet.form';
import { retry, switchMap } from 'rxjs/operators';
import { RealDebridTorrentsInfoForm } from '../forms/torrents/real-debrid-torrents-info.form';
import { throwError } from 'rxjs';
import { RealDebridTorrentsSelectFilesForm } from '../forms/torrents/real-debrid-torrents-select-files.form';

export class RealDebridCacheUrlCommand {
  static handle(url: string) {
    return RealDebridTorrentsAddMagnetForm.submit(url).pipe(
      switchMap(t => {
        return RealDebridTorrentsInfoForm.submit(t.id);
      }),
      switchMap(info => {
        if (info.files.length === 0) {
          return throwError('Cannot add this source');
        }

        return RealDebridTorrentsSelectFilesForm.submit(info.id, 'all').pipe(
          retry(2),
          switchMap(() => {
            return RealDebridTorrentsInfoForm.submit(info.id);
          })
        );
      })
    );
  }
}
