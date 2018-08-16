import { Observable, Observer } from 'rxjs'

const onSubcribe = (observer: Observer<number>) => {
  observer.next(1)
  observer.next(2)
  observer.next(3)
}

const $source = new Observable(onSubcribe)

const theObserver = {
  next (val) {
    console.log(val)
  }
}

$source.subscribe(theObserver)


function map (project) {
  return new Observable(observer => {
    this.subscribe({
      next (value) {
        observer.next(project(value))
      },
      error (error) {
        observer.error(error)
      },
      complate () {
        observer.complete()
      }
    })
  })
}
